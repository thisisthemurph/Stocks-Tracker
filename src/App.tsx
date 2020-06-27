import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { getFinanceInfo, getSummary } from "./api/yahoo-finance"
import { Symbol, SymbolSummary, FinanceInfo } from "./types"

import Nav from "./components/Nav"
import Search from "./components/Search"
import Finance from "./components/Finance"

import "./App.scss"
import SymbolList from "./components/SymbolList"

const App: React.FC = () => {
	const [symbol, setSymbol] = useState<Symbol | null>(null)
	const [summary, setSummary] = useState<SymbolSummary | null>(null)
	const [financeInfo, setFinanceInfo] = useState<FinanceInfo | null>(null)
	const [range, setRange] = useState("1d")

	const history: Symbol[] = JSON.parse(localStorage.getItem("searchHistory") || "[]")
	const favourites: Symbol[] = JSON.parse(localStorage.getItem("favourites") || "[]")

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

			if (symbol !== null) {
				const info = await getFinanceInfo(symbol.symbol, intervalValue, range)
				setFinanceInfo(info)
			}
		})()
	}, [symbol, range])

	useEffect(() => {
		;(async () => {
			if (symbol !== null) {
				const companySummary = await getSummary(symbol.symbol)
				setSummary(companySummary)
			}
		})()
	}, [symbol])

	const chart = financeInfo?.chart.result[0]

	return (
		<Router>
			<div className="App">
				<header className="header">
					<Search registerSymbol={(symbol) => setSymbol(symbol)} />
				</header>
				<main className="main">
					<Switch>
						<Route path="/history">
							<SymbolList heading="Search histroy" symbols={history} />
						</Route>
						<Route path="/favourites">
							<SymbolList heading="Favourites" symbols={favourites} />
						</Route>
						<Route path="/">
							{chart && symbol && (
								<Finance
									company={symbol}
									chartData={chart}
									summary={summary}
									range={range}
									setRange={setRange}
								/>
							)}
						</Route>
					</Switch>
				</main>
				<Nav />
			</div>
		</Router>
	)
}

export default App
