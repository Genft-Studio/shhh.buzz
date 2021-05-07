import React, { createContext, useState, useEffect } from 'react'

const initialState = {
    walletWords: ''
}

export const StateContext = createContext(initialState)

const StateStorageKey = 'secret-wallet'

const EstatePlanStore = ({ children }) => {
    const [state, setState] = useState(() => {
        try {
            const string = localStorage.getItem(StateStorageKey)
            return (string && string !== 'null') ? JSON.parse(string) : { ...initialState }
        } catch (e) {
            return initialState
        }

    })

    useEffect(() => {
        localStorage.setItem(StateStorageKey, JSON.stringify(state))
    }, [state])

    return (
        <StateContext.Provider value={[state, setState]}>
            {children}
        </StateContext.Provider>
    )
}

export default EstatePlanStore
