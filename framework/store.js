
export class Store {
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this.state = reducer(initialState, { type: null });
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            const index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        }
    }

    // setState(state) {
    //     this.state = (typeof state === "function" ? state(this.state) : state);
    //     this.listeners.forEach((listener) => listener());
    // }

    //could be used instead of setState
    dispatch(action) {
        console.log("dispatch", action);
        this.state = this.reducer(this.state, action);
        this.listeners.forEach((listener) => listener());
    }
}

