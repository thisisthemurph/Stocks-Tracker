import React, { useEffect, useContext } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { StoreContext } from "./store/store"

import Nav from "./components/Nav"
import Search from "./components/Search"
import Finance from "./components/Finance"
import History from "./components/History"
import Favourites from "./components/Favourites"
import Settings from "./components/Settings"
import Home from "./components/Home"

import "./App.scss"

const App: React.FC = () => {
	const { state, actions } = useContext(StoreContext)
	const { settings } = state

	useEffect(() => {
		actions.getSettings()
	}, [])

	return (
		<Router>
			<div className="App" data-theme={settings.theme.toLocaleLowerCase()}>
				<Search />
				<main className="main">
					<Switch>
						<Route path="/history">
							<History />
						</Route>
						<Route path="/favourites">
							<Favourites />
						</Route>
						<Route path="/settings">
							<Settings />
						</Route>
						<Route path="/:symbol">
							<Finance />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</main>
				<Nav />
			</div>
		</Router>
	)
}

export default App
