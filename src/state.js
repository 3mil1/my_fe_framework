
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


const liInitialState = {
    li: null
}

const SET_LI = 'SET_LI'
const DELETE_LI = 'DELETE_LI'

function liReducer(state = liInitialState, action) {
    switch (action.type) {
        case SET_LI:
            return {
                li: action.li
            }
        case DELETE_LI: {
            return {
                li: state.li.filter(el => {
                    return el.id !== action.id
                })
            }
        }
        default:
            return state
    }
}

export function setLi(li) {
    return {
        type: SET_LI,
        li
    }
}

export function deleteLi(id) {
    return {
        type: DELETE_LI,
        id
    }
}

function combineReducers(reducers) {
    return (state = {}, action) => {
        const result = {};
        Object.entries(reducers).forEach(([key, reducer]) => {
            result[key] = reducer(state[key], action)
        })
        return result
    }
}

export const store = new Store(combineReducers({
    li: liReducer,
}))
