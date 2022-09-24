import VDom from "../framework/Vdom";
import {store} from "./state";
import {App} from "./App";
import {render} from "../framework"

export function renderView(state) {
    render(
        <App state={state}/>,
        document.getElementById('app')
    )
}

store.subscribe(() => {
    renderView(store.getState())
})

renderView(store.getState())