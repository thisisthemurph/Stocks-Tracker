import React from "react"
import { Symbol, SymbolSummary, ChartResult } from "../../types"
import FinanceHeader from "./FinanceHeader"
import FinanceChart from "./FinanceChart"
import FinanceStats from "./FinanceStats"
import "./Finance.scss"

interface FinanceProps {
	company: Symbol
	summary: SymbolSummary
	chartData: ChartResult
}

const Finance: React.FC<FinanceProps> = ({ company, summary, chartData }: FinanceProps) => {
	const open = chartData.indicators.quote[0].open[0]

	return (
		<div className="finance">
			<FinanceHeader
				company={company}
				currency={chartData.meta.currency}
				currentPrice={summary.financialData.currentPrice.fmt}
			/>

			<FinanceChart />
			<FinanceStats previousClose={chartData.meta.previousClose} open={open} />
		</div>
	)
}

export default Finance
