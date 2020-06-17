import React, { useState } from "react"
import "./Search.scss"

interface SearchResult {
	exchange: string
	shortname: string
	quoteType: string
	symbol: string
	index: string
}

const Search: React.FC = () => {
	const [searchText, setSearchText] = useState("")
	const [searchResults, setSearchResults] = useState<Array<SearchResult>>([])
	const [index, setIndex] = useState(0)

	const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setSearchText(value)

		if (value.length > 0) {
			const res = await fetch(`http://localhost:8181/yf/api/finance/search?q=${value}`, {
				headers: {
					"Content-Type": "application/json",
				},
			})

			if (res && res.status === 200) {
				const data = await res.json()
				setSearchResults(data.results)
			} else {
				setSearchResults([])
			}
		} else {
			setSearchResults([])
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
					const item = searchResults[index]
					console.log(`You have selected ${item.shortname}`)
					break
			}
		}
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
			<ul className="search__result-list">
				{searchResults.map((result, idx) => (
					<li key={result.symbol} className="search__result">
						<div
							className={`result-item${idx === index ? " result-item--active" : ""}`}
							role="link"
							title={result.shortname}
							tabIndex={0}
						>
							<span className="result-item__symbol">{result.symbol}</span>
							<span className="result-item__name">{result.shortname}</span>
							<span className="result-item__info">
								{result.quoteType} - {result.exchange}
							</span>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Search
