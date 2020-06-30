import React, { useEffect, useContext } from "react"
import SymbolList from "../SymbolList"

import { StoreContext } from "../../store/store"

const Favourites: React.FC = () => {
	const { state, actions } = useContext(StoreContext)
	const { favourites } = state

	useEffect(() => {
		actions.getFavourites()
	}, [])

	return (
		<div className="favourites container">
			<header className="heading">
				<main>
					<h1 className="heading__heading">Favourites</h1>
					<p className="heading__subheading">All your favourite symbols in one place</p>
				</main>
				{favourites.length > 0 && (
					<button className="btn" onClick={actions.clearFavourites}>
						Clear favourites
					</button>
				)}
			</header>
			<SymbolList symbols={favourites} />
		</div>
	)
}

export default Favourites
