export class createBrowserHistory {
    get location() {
        const state = window.history.state
        return state ? state.location : window.location.pathname
    }

    push(location) {
        const state = {location}
        window.history.pushState(state, '', location)
        window.dispatchEvent(new PopStateEvent('popstate', {state: state}));
    }

    createHref(path) {
        return path
    }

    listen(listener) {
        const stateListener = (event) => {
            const state = event.state
            listener(state ? state.location : window.location.pathname)
        }
        window.addEventListener('popstate', stateListener, false)

        return () => {
            window.removeEventListener('popstate', stateListener)
        }
    }
}



