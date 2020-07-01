import { Symbol } from "../types"

export interface State {
	history: Symbol[]
	favourites: Symbol[]
	settings: {
		maxHistory: number
		theme: string
	}
}

export interface Action {
	type: string
	payload?: {
		symbol?: string
		historyItem?: Symbol
		favourite?: Symbol
		maxHistory?: number
	}
}
