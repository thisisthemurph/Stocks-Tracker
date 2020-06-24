import React, { useState } from "react"
import { Symbol } from "../../types"
import { search, getFinanceInfo } from "../../api/yahoo-finance"
import "./Search.scss"

interface SearchProps {
	registerSymbol: (symbol: Symbol) => void
}

const HISTORY_MAX_SIZE = 8

const Search: React.FC<SearchProps> = ({ registerSymbol }: SearchProps) => {
	const [searchText, setSearchText] = useState("")
	const [searchResults, setSearchResults] = useState<Array<Symbol>>([])
	const [index, setIndex] = useState(0)
	const [history, setHistory] = useState<Array<Symbol>>(
		JSON.parse(localStorage.getItem("searchHistory") || "[]")
	)

	const addToHistory = (symbol: Symbol) => {
		const hist = history.slice(0)

		const index = hist.findIndex((h: Symbol) => h.symbol === symbol.symbol)
		if (index > -1) {
			// Remove the item form current position if already in the history
			hist.splice(index, 1)
		} else if (history.length >= HISTORY_MAX_SIZE) {
			// Remove the oldest item if history is full
			hist.pop()
		}

		setHistory([symbol, ...hist])
		localStorage.setItem("searchHistory", JSON.stringify([symbol, ...hist]))
	}

	const retrieveHistory = () => {
		const histRes = history.map((item) => getFinanceInfo(item.symbol))

		Promise.all(histRes).then((historyResults) => {
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
					setIndex((index - 1 + searchResults.length) % searchResults.length)
					break

				case "ArrowDown":
					setIndex((index + 1) % searchResults.length)
					break

				case "Home":
					setIndex(0)
					break

				case "End":
					setIndex(searchResults.length - 1)
					break

				case "Enter":
					const symbol = searchResults[index]
					selectResult(symbol)
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
		addToHistory(symbol)
	}

	return (
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
			{searchResults && (
				<ul className="search__result-list">
					{searchResults.map((company, idx) => (
						<li
							key={company.symbol}
							className="search__result"
							onClick={() => selectResult(company)}
						>
							<div
								className={`result-item${
									idx === index ? " result-item--active" : ""
								}`}
								role="link"
								title={company.shortname}
								tabIndex={0}
							>
								<span className="result-item__symbol">{company.symbol}</span>
								<span className="result-item__name">{company.shortname}</span>
								<span className="result-item__info">
									{company.quoteType} - {company.exchange}
								</span>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Search
