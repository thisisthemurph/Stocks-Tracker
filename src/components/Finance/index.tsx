import React, { useState, useEffect, useContext, useCallback } from "react"
import { useParams } from "react-router"

import { getSymbol, getFinanceInfo, getSummary } from "../../api/yahoo-finance"
import { Symbol, SymbolSummary, FinanceInfo, ChartResult } from "../../types"
import { StoreContext } from "../../store/store"

import FinanceHeader from "./FinanceHeader"
import FinanceChart from "./FinanceChart"
import FinanceStats from "./FinanceStats"
import FinanceSummary from "./FinanceSummary"

import "./Finance.scss"

interface ParamTypes {
	symbol: string
}

const Finance: React.FC = () => {
	const { symbol: symbolParam } = useParams<ParamTypes>()

	const { actions } = useContext(StoreContext)

	const [symbol, setSymbol] = useState<Symbol | null>(null)
	const [summary, setSummary] = useState<SymbolSummary | null>(null)
	const [financeInfo, setFinanceInfo] = useState<FinanceInfo | null>(null)
	const [chart, setChart] = useState<ChartResult | null>(null)
	const [range, setRange] = useState("1d")

	const getDefaultIntervalFromRange = (range: string): string => {
		switch (range) {
			case "1d":
				return "2m"
			case "5d":
				return "15m"
			case "1mo":
				return "30m"
			case "6mo":
			case "ytd":
			case "1y":
				return "1d"
			case "5y":
				return "1wk"
			default:
				return "1mo"
		}
	}

	useEffect(() => {
		;(async () => {
			if (symbolParam) {
				setSummary(await getSummary(symbolParam))
				setSymbol(await getSymbol(symbolParam))
			}
		})()
	}, [symbolParam])

	useEffect(() => {
		actions.addHistoryItem(symbol)
		;(async () => {
			const intervalValue = getDefaultIntervalFromRange(range)

			if (symbolParam) {
				const info = await getFinanceInfo(symbolParam, intervalValue, range)
				setFinanceInfo(info)
			}
		})()
	}, [symbolParam, symbol, range])

	useEffect(() => {
		if (financeInfo) {
			setChart(financeInfo.chart.result[0])
		}
	}, [financeInfo])

	if (symbol && chart) {
		const quote = chart.indicators.quote[0]
		const open = "open" in quote ? quote.open[0] : null

		return (
			<div className="finance">
				<FinanceHeader
					symbol={symbol}
					currency={chart.meta.currency}
					currentPrice={summary?.financialData.currentPrice.fmt || "-"}
				/>

				<FinanceChart chartData={chart} range={range} setRange={setRange} />
				<FinanceStats previousClose={chart.meta.previousClose} open={open} />
				{summary && <FinanceSummary summary={summary} />}
			</div>
		)
	}

	return <p className="container">Loading financial data...</p>
}

export default Finance
