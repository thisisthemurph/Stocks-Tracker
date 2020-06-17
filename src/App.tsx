import React from "react"
import Search from "./components/Search"
import "./App.scss"

const App: React.FC = () => {
	return (
		<div className="App">
			<header className="App-header">
				<div className="container">
					<Search />
				</div>
			</header>
		</div>
	)
}

export default App
