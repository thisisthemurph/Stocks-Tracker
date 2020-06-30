import ActionTypes from "./actionTypes"
import { State, Action } from "./types"
import { Symbol } from "../types"

const HISTORY_MAX_SIZE = 8
const LS_KEYS = {
	history: "searchHistory",
	favourites: "favourites",
}

const initialState: State = {
	history: [],
	favourites: [],
}

const reducer = (state = initialState, action: Action): State => {
	let hist: Symbol[]

	switch (action.type) {
		case ActionTypes.Get_History:
			return { ...state, history: JSON.parse(localStorage.getItem(LS_KEYS.history) || "[]") }

		case ActionTypes.Add_History:
			hist = [...state.history]
			const newItem = action?.payload?.historyItem
			if (newItem) {
				const index = hist.findIndex((h) => h.symbol === newItem.symbol)

				if (index > -1) {
					// Remove the item form current position if already in the history
					hist.splice(index, 1)
				} else if (hist.length >= HISTORY_MAX_SIZE) {
					// Remove the oldest item if history is full
					hist.pop()
				}

				const newHist = [newItem, ...hist]
				localStorage.setItem(LS_KEYS.history, JSON.stringify(newHist))

				return { ...state, history: newHist }
			}

			return { ...state, history: hist }

		case ActionTypes.Remove_History:
			const itemToRemove = action?.payload?.historyItem
			if (itemToRemove) {
				hist = state.history.filter((h) => h.symbol !== itemToRemove.symbol)

				return { ...state, history: hist }
			}

			return state

		case ActionTypes.Clear_History:
			localStorage.removeItem(LS_KEYS.history)
			return { ...state, history: [] }

		case ActionTypes.Get_Favourites:
			return {
				...state,
				favourites: JSON.parse(localStorage.getItem(LS_KEYS.favourites) || "[]"),
			}

		case ActionTypes.Add_Favourite:
			const fav = action.payload?.favourite
			if (fav) {
				const newFavs = [...state.favourites, fav]
				localStorage.setItem(LS_KEYS.favourites, JSON.stringify(newFavs))

				return { ...state, favourites: newFavs }
			}

			return state

		case ActionTypes.Remove_Favourite:
			const symbolToRemove = action.payload?.symbol
			if (symbolToRemove) {
				const newFavs = state.favourites.filter((fav) => fav.symbol !== symbolToRemove)
				localStorage.setItem(LS_KEYS.favourites, JSON.stringify(newFavs))

				return { ...state, favourites: newFavs }
			}

			return { ...state }

		case ActionTypes.Clear_Favourites:
			localStorage.removeItem(LS_KEYS.favourites)
			return { ...state, favourites: [] }

		default:
			return state
	}
}

export { initialState, reducer }
