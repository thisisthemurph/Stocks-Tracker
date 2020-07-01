import ActionTypes from "./actionTypes"
import { State, Action } from "./types"
import { Symbol } from "../types"

enum LS_KEYS {
	History = "searchHistory",
	Favourites = "favourites",
	Settings = "settings",
}

const initialState: State = {
	history: [],
	favourites: [],
	settings: {
		maxHistory: 8,
		theme: "Night",
	},
}

const reducer = (state = initialState, action: Action): State => {
	let hist: Symbol[]

	switch (action.type) {
		case ActionTypes.Get_History:
			return { ...state, history: JSON.parse(localStorage.getItem(LS_KEYS.History) || "[]") }

		case ActionTypes.Add_History:
			hist = [...state.history]
			const newItem = action?.payload?.historyItem
			if (newItem) {
				const index = hist.findIndex((h) => h.symbol === newItem.symbol)

				if (index > -1) {
					// Remove the item form current position if already in the history
					hist.splice(index, 1)
				} else if (hist.length >= state.settings.maxHistory) {
					// Remove the oldest item if history is full
					hist.pop()
				}

				const newHist = [newItem, ...hist]
				localStorage.setItem(LS_KEYS.History, JSON.stringify(newHist))

				return { ...state, history: newHist }
			}

			return { ...state, history: hist }

		case ActionTypes.Remove_History:
			const itemToRemove = action?.payload?.historyItem
			if (itemToRemove) {
				hist = state.history.filter((h) => h.symbol !== itemToRemove.symbol)
				localStorage.setItem(LS_KEYS.History, JSON.stringify(hist))

				return { ...state, history: hist }
			}

			return state

		case ActionTypes.Clear_History:
			localStorage.removeItem(LS_KEYS.History)
			return { ...state, history: [] }

		case ActionTypes.Get_Favourites:
			return {
				...state,
				favourites: JSON.parse(localStorage.getItem(LS_KEYS.Favourites) || "[]"),
			}

		case ActionTypes.Add_Favourite:
			const fav = action.payload?.favourite
			if (fav) {
				const newFavs = [...state.favourites, fav]
				localStorage.setItem(LS_KEYS.Favourites, JSON.stringify(newFavs))

				return { ...state, favourites: newFavs }
			}

			return state

		case ActionTypes.Remove_Favourite:
			const symbolToRemove = action.payload?.symbol
			if (symbolToRemove) {
				const newFavs = state.favourites.filter((fav) => fav.symbol !== symbolToRemove)
				localStorage.setItem(LS_KEYS.Favourites, JSON.stringify(newFavs))

				return { ...state, favourites: newFavs }
			}

			return { ...state }

		case ActionTypes.Clear_Favourites:
			localStorage.removeItem(LS_KEYS.Favourites)
			return { ...state, favourites: [] }

		case ActionTypes.Get_Settings:
			const settings = JSON.parse(
				localStorage.getItem(LS_KEYS.Settings) || JSON.stringify(initialState.settings)
			)

			return { ...state, settings: settings }

		case ActionTypes.Update_Settings_MaxHistory:
			const newMaxHist = action.payload?.maxHistory
			const newHistSettings = {
				...state.settings,
				maxHistory:
					newMaxHist !== undefined ? newMaxHist : initialState.settings.maxHistory,
			}

			localStorage.setItem(LS_KEYS.Settings, JSON.stringify(newHistSettings))
			return { ...state, settings: newHistSettings }

		case ActionTypes.Update_Settings_Theme:
			const newThemeSettings = {
				...state.settings,
				theme: action.payload?.theme || initialState.settings.theme,
			}

			localStorage.setItem(LS_KEYS.Settings, JSON.stringify(newThemeSettings))
			return { ...state, settings: newThemeSettings }

		case ActionTypes.Reset_Settings:
			localStorage.removeItem(LS_KEYS.Settings)
			return { ...state, settings: initialState.settings }

		default:
			return state
	}
}

export { initialState, reducer }
