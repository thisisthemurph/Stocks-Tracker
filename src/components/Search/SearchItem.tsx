import React from "react"
import { Symbol } from "../../types"

interface SearchItemProps {
	symbol: Symbol
	active: boolean
	selectResult: (symbol: Symbol) => void
}

const Search: React.FC<SearchItemProps> = ({ symbol, active, selectResult }: SearchItemProps) => {
	return (
		<li className="search__result" onClick={() => selectResult(symbol)}>
			<div
				className={`result-item${active ? " result-item--active" : ""}`}
				role="link"
				title={symbol.shortname}
				tabIndex={0}
			>
				<span className="result-item__symbol">{symbol.symbol}</span>
				<span className="result-item__name">{symbol.shortname}</span>
				<span className="result-item__info">
					{symbol.quoteType} - {symbol.exchange}
				</span>
			</div>
		</li>
	)
}

export default Search
