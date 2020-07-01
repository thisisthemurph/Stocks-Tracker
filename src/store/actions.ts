import { State, Action } from "./types"
import { Symbol } from "../types"
import ActionTypes from "./actionTypes"

interface Actions {
	getHistory: () => void
	addHistoryItem: (data: Symbol) => void
	removeHistoryItem: (data: Symbol) => void
	clearHistory: () => void
	getFavourites: () => void
	removeFavourite: (data: string) => void
	clearFavourites: () => void
	addFavourite: (data: Symbol) => void
	getSettings: () => void
	resetSettings: () => void
	updateMaxHistory: (data: number) => void
}

type DispatchCallback = (action: Action) => void

export const useActions = (state: State, dispatch: DispatchCallback): Actions => ({
	getHistory: () => {
		dispatch({ type: ActionTypes.Get_History })
	},
	addHistoryItem: (data: Symbol) => {
		dispatch({ type: ActionTypes.Add_History, payload: { historyItem: data } })
	},
	removeHistoryItem: (data: Symbol) => {
		dispatch({ type: ActionTypes.Remove_History, payload: { historyItem: data } })
	},
	clearHistory: () => {
		dispatch({ type: ActionTypes.Clear_History })
	},
	getFavourites: () => {
		dispatch({ type: ActionTypes.Get_Favourites })
	},
	addFavourite: (data: Symbol) => {
		dispatch({ type: ActionTypes.Add_Favourite, payload: { favourite: data } })
	},
	removeFavourite: (data: string) => {
		dispatch({ type: ActionTypes.Remove_Favourite, payload: { symbol: data } })
	},
	clearFavourites: () => {
		dispatch({ type: ActionTypes.Clear_Favourites })
	},
	getSettings: () => {
		dispatch({ type: ActionTypes.Get_Settings })
	},
	resetSettings: () => {
		dispatch({ type: ActionTypes.Reset_Settings })
	},
	updateMaxHistory: (data: number) => {
		dispatch({ type: ActionTypes.Update_Settings_MaxHistory, payload: { maxHistory: data } })
	},
})
