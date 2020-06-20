import React, { useState, useEffect } from "react"
import Search from "./components/Search"
import { getFinanceInfo, getSummary } from "./api/yahoo-finance"
import { Symbol, SymbolSummary, FinanceInfo } from "./types"
import Finance from "./components/Finance"
import "./App.scss"

const App: React.FC = () => {
	const [company, setCompany] = useState<Symbol | null>(null)
	const [summary, setSummary] = useState<SymbolSummary | null>(null)
	const [financeInfo, setFinanceInfo] = useState<FinanceInfo | null>(null)

	useEffect(() => {
		;(async () => {
			if (company !== null) {
				const info = (await getFinanceInfo(company.symbol)) as FinanceInfo
				setFinanceInfo(info)

				const companySummary = (await getSummary(company.symbol)) as SymbolSummary
				setSummary(companySummary)
			}
		})()
	}, [company])

	const chart = financeInfo?.chart.result[0]

	return (
		<div className="App">
			<header className="App-header">
				<Search registerSymbol={(symbol) => setCompany(symbol)} />
			</header>
			<main>
				{chart && company && summary && (
					<Finance company={company} chartData={chart} summary={summary} />
				)}
			</main>
		</div>
	)
}

export default App
