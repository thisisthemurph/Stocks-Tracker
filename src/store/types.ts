import { Symbol } from "../types"

export interface State {
	history: Symbol[]
	favourites: Symbol[]
}

export interface Action {
	type: string
	payload?: {
		symbol?: string
		historyItem?: Symbol
		favourite?: Symbol
	}
}
