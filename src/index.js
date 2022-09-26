import VDom from "../framework/Vdom";
import {store} from "./store/store";
import {App} from "./App";
import {render} from "../framework"

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