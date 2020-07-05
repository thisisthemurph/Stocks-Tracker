import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router"

import { Symbol } from "../../types"
import { search } from "../../api/yahoo-finance"
import { StoreContext } from "../../store/store"
import { X_ICON } from "../../icons"

import SearchItem from "./SearchItem"
import "./Search.scss"

const Search: React.FC = () => {
	const browserHistory = useHistory()

	const [searchText, setSearchText] = useState("")
	const [searchResults, setSearchResults] = useState<Array<Symbol | null>>([])
	const [selectedItem, setSelectedItem] = useState(0)
	const [showCancelBtn, setShowCancelBtn] = useState(false)

	const { state, actions } = useContext(StoreContext)
	const { history } = state

	useEffect(() => {
		actions.getHistory()
	}, [])

	const retrieveHistory = () => {
		setSearchResults(history)
		setShowCancelBtn(true)
	}

	const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setSearchText(value)
		setShowCancelBtn(true)

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

		setShowCancelBtn(false)
	}

	const selectResult = (symbol: Symbol) => {
		setSearchText("")
		setSearchResults([])
		actions.addHistoryItem(symbol)
		browserHistory.push(`/${symbol.symbol}`)
	}

	return (
		<header className="header">
			<div className="search" onBlur={handleOnBlur}>
				<button
					className={`search__cancel-btn${
						showCancelBtn ? " search__cancel-btn--show" : ""
					}`}
					onClick={() => {
						setSearchText("")
						setSearchResults([])
					}}
				>
					<X_ICON />
				</button>

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
