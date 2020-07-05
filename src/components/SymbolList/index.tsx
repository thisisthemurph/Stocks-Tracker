import React from "react"
import { Link } from "react-router-dom"

import { Symbol } from "../../types"
import "./SymbolList.scss"

interface SymbolListProps {
	symbols: Symbol[]
}

const SymbolList: React.FC<SymbolListProps> = ({ symbols }: SymbolListProps) => {
	return (
		<div className="symbol-list">
			{symbols.map((symbol) => (
				<Link to={`/${symbol.symbol}`} key={symbol.symbol} className="symbol">
					<span className="symbol__symbol">{symbol.symbol}</span>
					<span className="symbol__name">{symbol.shortName}</span>
					<span className="symbol__info">
						{symbol.quoteType} - {symbol.exchange}
					</span>
				</Link>
			))}
		</div>
	)
}

export default SymbolList
