import React, { useState } from "react"
import Search from "./components/Search"
import "./App.scss"

const App: React.FC = () => {
	const [symbol, setSymbol] = useState<string | null>(null)

	return (
		<div className="App">
			<header className="App-header">
				<div className="container">
					<Search registerSymbol={(symbol) => setSymbol(symbol)} />
				</div>
			</header>
			<main>
				<div className="container">
					<h1>{symbol}</h1>
				</div>
			</main>
		</div>
	)
}

export default App
