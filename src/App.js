import VDom from "../framework/Vdom";
import "./styles.css";
import {Li} from "./li_example/li";
import {store} from "./store/store";
import {setLocation} from "./router/router_state";
import {Link, Route} from "../framework/router";
import {history} from "./index";

export function App() {
    let state = store.getState();
    let location = state.location.current
    const dispatch = store.dispatch.bind(store)

    const navigate = (location) => {
        dispatch(setLocation(location))
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


