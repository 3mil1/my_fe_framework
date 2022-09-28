import VDom from "../framework/Vdom";
import {store} from "./store/store";
import {App} from "./App";
import {render} from "../framework"
import {setLocation} from "./router/router_state";
import {createBrowserHistory} from "../framework/router";

export const history = new createBrowserHistory
history.listen(store.dispatch.bind(store), setLocation)

export function renderView(store) {
    const state = store.getState()
    render(
        <App state={state}/>,
        document.getElementById('app')
    )
}

store.subscribe(() => {
    renderView(store)
})

renderView(store)




