
export class Store {
    constructor(reducer, initialState) {
        this.reducer = reducer
        this.state = reducer(initialState, {type: null})
        this.listeners = []
    }

    getState() {
        return this.state
    }

    subscribe(listener) {
        this.listeners.push(listener)
        return () => {
            const index = this.listeners.indexOf(listener)
            this.listeners.splice(index, 1)
        }
    }

    dispatch(action) {
        this.state = this.reducer(this.state, action)
        this.listeners.forEach((listener) => listener())
    }
}

export function combineReducers(reducers) {
    return (state = {}, action) => {
        const result = {};
        Object.entries(reducers).forEach(([key, reducer]) => {
            result[key] = reducer(state[key], action)
        })
        return result
    }
}