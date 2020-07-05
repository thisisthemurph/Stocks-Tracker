import React, { useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"

import { StoreContext } from "../../store/store"

const Home: React.FC = () => {
	const browserHistory = useHistory()

	const { state, actions } = useContext(StoreContext)
	const { history } = state

	useEffect(() => {
		actions.getHistory()
	}, [])

	if (history.length > 0) {
		browserHistory.push(`/${history[0].symbol}`)
	}

	return (
		<div className="container">
			<h1>Home</h1>
		</div>
	)
}

export default Home
