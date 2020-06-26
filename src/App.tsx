import React, { useState, useEffect } from "react"

import { getFinanceInfo, getSummary } from "./api/yahoo-finance"
import { Symbol, SymbolSummary, FinanceInfo } from "./types"

import Nav from "./components/Nav"
import Search from "./components/Search"
import Finance from "./components/Finance"

import "./App.scss"

const App: React.FC = () => {
	const [company, setCompany] = useState<Symbol | null>(null)
	const [summary, setSummary] = useState<SymbolSummary | null>(null)
	const [financeInfo, setFinanceInfo] = useState<FinanceInfo | null>(null)
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
			const intervalValue = getDefaultIntervalFromRange(range)

			if (company !== null) {
				const info = await getFinanceInfo(company.symbol, intervalValue, range)
				setFinanceInfo(info)
			}
		})()
	}, [company, range])

	useEffect(() => {
		;(async () => {
			if (company !== null) {
				const companySummary = await getSummary(company.symbol)
				setSummary(companySummary)
			}
		})()
	}, [company])

	const chart = financeInfo?.chart.result[0]

	return (
		<div className="App">
			<header className="header">
				<Search registerSymbol={(symbol) => setCompany(symbol)} />
			</header>
			<main className="main">
				{chart && company && (
					<Finance
						company={company}
						chartData={chart}
						summary={summary}
						range={range}
						setRange={setRange}
					/>
				)}
			</main>
			<Nav />
		</div>
	)
}

export default App
