import VDom from "../framework/Vdom";
import {store} from "../framework/store";
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

// setInterval(() => {
//     store.setState((state) => {
//         return {
//             ...state,
//             time: new Date()
//         }
//
//     })
//     console.log("State:", store.getState());
//
// }, 1000)