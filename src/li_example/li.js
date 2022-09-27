import VDom from "../../framework/Vdom";
import {store} from "../store/store";
import {deleteLi, setLi} from "./li_state";

export function Li() {
    let state = store.getState();
    const dispatch = store.dispatch.bind(store)

    const set = () => {
        dispatch(setLi([
            {id: 1, text: "1"},
            {id: 2, text: "2"},
            {id: 3, text: "3"},
            {id: 4, text: "4"},
        ]))
    }

    const deleteId = (id) => {
        dispatch(deleteLi(id))
    }

    return (
        <section className="todoapp">
            <ul>
                {state.li_page.li ? state.li_page.li.map(el => {
                        return <li key={el.id} onClick={() => {
                            deleteId(el.id)
                        }
                        }>{el.text}</li>
                    })
                    : "nothing to show"}

            </ul>
            <button onClick={() => set()}>SET LI</button>
        </section>
    )
}