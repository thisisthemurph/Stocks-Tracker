import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { Symbol, ChartResult } from "../../types"
import { getFinanceInfo } from "../../api/yahoo-finance"
import SearchChart from "./SearchChart"

interface SearchItemProps {
	symbol: Symbol
	active: boolean
	selectResult: (symbol: Symbol) => void
}

const Search: React.FC<SearchItemProps> = ({ symbol, active, selectResult }: SearchItemProps) => {
	const [chartData, setChartData] = useState<ChartResult | null>(null)

	useEffect(() => {
		const getChartData = async () => {
			if (symbol !== null) {
				const info = await getFinanceInfo(symbol.symbol)

				if (info) {
					setChartData(info.chart.result[0])
				}
			}
		}

		getChartData()
	}, [])

	return (
		<li className="search__result" onClick={() => selectResult(symbol)}>
			<Link
				to={`/${symbol.symbol}`}
				className={`result-item${active ? " result-item--active" : ""}`}
				title={symbol.shortName}
				tabIndex={0}
			>
				<span className="result-item__symbol">{symbol.symbol}</span>
				<span className="result-item__name">{symbol.shortName}</span>
				<span className="result-item__info">
					{symbol.quoteType} - {symbol.exchange}
				</span>

				{chartData && <SearchChart chartData={chartData} />}
			</Link>
		</li>
	)
}

export default Search
