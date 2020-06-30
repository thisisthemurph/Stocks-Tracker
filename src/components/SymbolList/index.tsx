import React from "react"

import { Symbol } from "../../types"
import "./SymbolList.scss"

interface SymbolListProps {
	symbols: Symbol[]
}

const SymbolList: React.FC<SymbolListProps> = ({ symbols }: SymbolListProps) => {
	return (
		<div className="symbol-list">
			{symbols.map((symbol) => (
				<div key={symbol.symbol} className="symbol">
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
