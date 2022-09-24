export class Store {
    constructor(initialState) {
        this.state = initialState
        this.listeners = []
    }

    subscribe(callback) {
        this.listeners.push(callback)
    }

    getState() {
        return this.state
    }

    changeState(diff) {
        this.state = {
            ...this.state,
            ...(typeof diff == 'function' ? diff(this.state) : diff)
        }

        this.listeners.forEach(listener => {
            listener()
        })
    }
}

const initialState = {
    li: [
        {id: 1, text: "1"},
        {id: 2, text: "2"},
        {id: 3, text: "3"},
        {id: 4, text: "4"},
    ]
}

export const store = new Store(initialState)
