import React, { useState, useEffect, useContext } from "react"

import { Symbol } from "../../types"
import { search, getFinanceInfo } from "../../api/yahoo-finance"
import { StoreContext } from "../../store/store"

import SearchItem from "./SearchItem"
import "./Search.scss"

interface SearchProps {
	registerSymbol: (symbol: Symbol) => void
}

const Search: React.FC<SearchProps> = ({ registerSymbol }: SearchProps) => {
	const [searchText, setSearchText] = useState("")
	const [searchResults, setSearchResults] = useState<Array<Symbol | null>>([])
	const [selectedItem, setSelectedItem] = useState(0)

	const { state, actions } = useContext(StoreContext)
	const { history } = state

	useEffect(() => {
		actions.getHistory()
	}, [])

	const retrieveHistory = () => {
		// Create a temp list of 'loading' results
		setSearchResults(history)

		// Once the promise has resolved, we will replace the temp data
		const histRes = history.map((item) => getFinanceInfo(item.symbol))
		Promise.all(histRes).then((historyResults) => {
			setSearchResults([])
			const searchResltsHistory: Symbol[] = []
			historyResults.forEach((info, idx) => {
				if (info !== null) {
					const meta = info.chart.result[0].meta
					const symbol: Symbol = {
						exchange: meta.exchangeName,
						shortname: history[idx].shortname || "",
						quoteType: meta.instrumentType,
						symbol: meta.symbol,
					}
					searchResltsHistory.push(symbol)
				}
			})
			setSearchResults(searchResltsHistory)
		})
	}

	const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setSearchText(value)

		const results = await search(value)
		if (results !== null) {
			setSearchResults(results)
		}
	}

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (searchResults.length > 0) {
			switch (event.key) {
				case "ArrowUp":
					setSelectedItem(
						(selectedItem - 1 + searchResults.length) % searchResults.length
					)
					break

				case "ArrowDown":
					setSelectedItem((selectedItem + 1) % searchResults.length)
					break

				case "Home":
					setSelectedItem(0)
					break

				case "End":
					setSelectedItem(searchResults.length - 1)
					break

				case "Enter":
					const symbol = searchResults[selectedItem]
					if (symbol) selectResult(symbol)
					break

				case "Escape":
					setSearchResults([])
					break
			}
		}
	}

	const handleOnBlur = (event: any) => {
		// If we are clicking outside the target area, clear the results
		if (!event.currentTarget.contains(event.relatedTarget)) {
			setSearchResults([])
		}
	}

	const selectResult = (symbol: Symbol) => {
		registerSymbol(symbol)
		setSearchText("")
		setSearchResults([])
		actions.addHistoryItem(symbol)
	}

	return (
		<header className="header">
			<div className="search" onBlur={handleOnBlur}>
				<input
					className="search__input"
					type="search"
					value={searchText}
					placeholder="Search for a company or symbol"
					onChange={handleSearchChange}
					onKeyDown={handleKeyPress}
					onFocus={retrieveHistory}
				/>

				<ul className="search__result-list">
					{searchResults.map(
						(company, idx) =>
							company && (
								<SearchItem
									key={company.symbol}
									symbol={company}
									active={idx === selectedItem}
									selectResult={selectResult}
								/>
							)
					)}
				</ul>
			</div>
		</header>
	)
}

export default Search
