import React, { useEffect, useContext } from "react"
import SymbolList from "../SymbolList"
import { StoreContext } from "../../store/store"

const History: React.FC = () => {
	const { state, actions } = useContext(StoreContext)
	const { history } = state

	useEffect(() => {
		actions.getHistory()
	}, [])

	return (
		<div className="history container">
			<header className="heading">
				<main>
					<h1 className="heading__heading">History</h1>
					<p className="heading__subheading">
						Following is the history of the symbols you have selected to review
					</p>
				</main>
				{history.length > 0 && (
					<button className="btn" onClick={actions.clearHistory}>
						Clear history
					</button>
				)}
			</header>
			<SymbolList symbols={history} />
		</div>
	)
}

export default History
