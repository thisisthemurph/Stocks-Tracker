import React, { useState, useEffect, useContext } from "react"

import { Symbol } from "../../types"
import { BOOKMARK__ICON } from "../../icons"
import { StoreContext } from "../../store/store"

import "./Finance.scss"

interface FinanceHeaderProps {
	symbol: Symbol
	currency: string
	currentPrice: string
}

const FinanceHeader: React.FC<FinanceHeaderProps> = ({
	symbol,
	currency,
	currentPrice,
}: FinanceHeaderProps) => {
	const [isFav, setIsFav] = useState<boolean>(false)

	const { state, actions } = useContext(StoreContext)
	const { favourites } = state

	useEffect(() => {
		actions.getFavourites()
	}, [])

	useEffect(() => {
		setIsFav(favourites.some((fav) => fav.symbol === symbol.symbol))
	}, [favourites, symbol.symbol])

	const toggleFavourite = () => {
		if (isFav) {
			actions.removeFavourite(symbol.symbol)
		} else {
			actions.addFavourite(symbol)
		}

		setIsFav(!isFav)
	}

	return (
		<div className="finance-header container">
			<main>
				<h1 className="finance-header__heading">
					{symbol.shortName} ({symbol.symbol})
				</h1>
				<p className="finance-header__subheading">
					Exchange: {symbol.exchange} - Currency is {currency}
				</p>
				<p className="finance-header__current-price">{currentPrice || "Not available"}</p>
			</main>
			<button
				className={`btn__fav${isFav ? " btn__fav--bookmarked" : ""}`}
				onClick={toggleFavourite}
			>
				<BOOKMARK__ICON />
			</button>
		</div>
	)
}

export default FinanceHeader
