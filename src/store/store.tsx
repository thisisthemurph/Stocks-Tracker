import React, { createContext, useReducer } from "react"
import { reducer, initialState } from "./reducer"
import { useActions } from "./actions"

import { State } from "./types"

interface StoreProviderProps {
	children: JSX.Element
}

interface ContextProps {
	state: State
	actions: any
}

const StoreContext = createContext<ContextProps>({ state: initialState, actions: useActions })

const StoreProvider = ({ children }: StoreProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const actions = useActions(state, dispatch)

	return <StoreContext.Provider value={{ state, actions }}>{children}</StoreContext.Provider>
}

export { StoreContext, StoreProvider }
