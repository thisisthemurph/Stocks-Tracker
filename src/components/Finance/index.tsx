import React from "react"
import { Symbol, SymbolSummary, ChartResult } from "../../types"
import FinanceHeader from "./FinanceHeader"
import FinanceChart from "./FinanceChart"
import FinanceStats from "./FinanceStats"
import FinanceSummary from "./FinanceSummary"
import "./Finance.scss"

interface FinanceProps {
	company: Symbol
	summary: SymbolSummary
	chartData: ChartResult
	setInterval: React.Dispatch<React.SetStateAction<string>>
	setRange: React.Dispatch<React.SetStateAction<string>>
}

const Finance: React.FC<FinanceProps> = ({
	company,
	summary,
	chartData,
	setInterval,
	setRange,
}: FinanceProps) => {
	const quote = chartData.indicators.quote[0]
	const open = "open" in quote ? quote.open[0] : null

	return (
		<div className="finance">
			<FinanceHeader
				company={company}
				currency={chartData.meta.currency}
				currentPrice={summary.financialData.currentPrice.fmt}
			/>

			<FinanceChart chartData={chartData} setInterval={setInterval} setRange={setRange} />
			<FinanceStats previousClose={chartData.meta.previousClose} open={open} />
			<FinanceSummary summary={summary} />
		</div>
	)
}

export default Finance
