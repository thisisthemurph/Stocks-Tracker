import React from "react"

import { Symbol } from "../../types"
import "./SymbolList.scss"

interface SymbolListProps {
	heading: string
	symbols: Symbol[]
}

const SymbolList: React.FC<SymbolListProps> = ({ heading, symbols }: SymbolListProps) => {
	return (
		<div className="symbol-list container">
			<h1>{heading}</h1>
			{symbols.map((symbol) => (
				<div className="symbol">
					<span className="symbol__symbol">{symbol.symbol}</span>
					<span className="symbol__name">{symbol.shortname}</span>
					<span className="symbol__info">
						{symbol.quoteType} - {symbol.exchange}
					</span>
				</div>
			))}
		</div>
	)
}

export default SymbolList
