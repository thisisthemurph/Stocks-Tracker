import React, { useState } from "react"
import { Symbol } from "../../types"
import { search } from "../../api/yahoo-finance"
import "./Search.scss"

interface SearchProps {
	registerSymbol: (symbol: Symbol) => void
}

const Search: React.FC<SearchProps> = ({ registerSymbol }: SearchProps) => {
	const [searchText, setSearchText] = useState("")
	const [searchResults, setSearchResults] = useState<Array<Symbol>>([])
	const [index, setIndex] = useState(0)

	const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setSearchText(value)

		const results = (await search(value)) as Symbol[]
		setSearchResults(results)
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
			}
		}
	}

	const selectResult = (symbol: Symbol) => {
		registerSymbol(symbol)
		setSearchText("")
	}

	return (
		<div className="search">
			<input
				className="search__input"
				type="search"
				value={searchText}
				placeholder="Search for a company or symbol"
				onChange={handleSearchChange}
				onKeyDown={handleKeyPress}
			/>
			{searchText && (
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
