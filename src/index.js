import VDom from "../framework/Vdom";
import {state} from "./state";
import {App} from "./App";
import {render} from "../framework"

export function renderView(state) {
    render(
        <App state={state}/>,
        document.getElementById('app')
    )
}

renderView(state)

setInterval(() => {
    state = {
        ...state,
        time: new Date()
    }

    renderView(state)
}, 1000)