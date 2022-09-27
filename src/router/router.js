import VDom from "../../framework/Vdom";
import {store, history} from "../store/store";
import {setLocation} from "./router_state";
import {Li} from "../li_example/li";

let count = 0

export function Router() {
    let state = store.getState();
    let location = state.location.current
    const dispatch = store.dispatch.bind(store)

    const navigate = (location) => {
        dispatch(setLocation(location))
    }
    if (count < 1) {
        // window.location.replace(window.location.pathname);
        window.addEventListener('popstate',() => {
                count++
                dispatch(setLocation(window.location.pathname));
        });
    }
            
    return (
        <div>
            <ul>
                <li><Link navigate={navigate} history={history} to="/">LI</Link></li>
                <li><Link navigate={navigate} history={history} to="/page_not_exist">404 page</Link></li>
            </ul>

            <div>
                <Route path={"/page_not_exist"} location={location}><NotFound/></Route>
                <Route path={"/"} location={location}><Li/></Route>
            </div>
        </div>
    )
}

function NotFound() {
    return <div>Not found!</div>
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



