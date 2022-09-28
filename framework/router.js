import VDom from "../framework/Vdom";

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

    listen(dispatch, listener) {
        window.addEventListener('popstate', () => {
            dispatch(listener(this.location))
        });
    }
}

export function Link({to, children, navigate, history}) {
    const href = to ? history.createHref(to) : ''
    const onClick = (event) => {
        event.preventDefault()
        navigate(to)
        history.push(to)
    }
    return <a href={href} onClick={onClick}>{children}</a>
}

export function Route({path, location, children}) {
    const match = matchPath(location, path)
    if (match) {
        return children
    }
    return null
}

function matchPath(location, path) {
    const regexp = new RegExp(
        '^' + path + '$'
    )
    return regexp.exec(location)
}

