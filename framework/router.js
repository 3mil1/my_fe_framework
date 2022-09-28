import VDom from "../framework/Vdom";
import { setLocation } from "../src/router/router_state";
import { store } from "../src/store/store";
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

export function Link({ to, children, navigate, history }) {
  let dispatch = store.dispatch.bind(store);
  const href = to ? history.createHref(to) : '';
  const onClick = event => {
    event.preventDefault();
    // navigate(to);
    dispatch(setLocation(to));
    history.push(to);
  };
  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
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

