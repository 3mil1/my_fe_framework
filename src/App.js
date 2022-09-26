import VDom from "../framework/Vdom";
import "./styles.css";
import {deleteLi, setLi, store} from "./state";

export function App({state}) {
    const set = () => {
        store.dispatch(setLi([
            {id: 1, text: "1"},
            {id: 2, text: "2"},
            {id: 3, text: "3"},
            {id: 4, text: "4"},
        ]))
    }

    const deleteId = (id) => {
        store.dispatch(deleteLi(id))
    }


    return (
        <section className="todoapp">
            <ul>
                {state.li.li ? state.li.li.map(el => {
                    return <li key={el.id} onClick={() => {
                        deleteId(el.id)
                    }
                    }>{el.text}</li>
                }) : "nothing to show"}

            </ul>
            <button onClick={() => set()}>SET LI</button>
        </section>
    )
}

function Header() {
    return (
        <header className="header">
            <h1>todos</h1>
            <label htmlFor="">
                <input type="input" className="new-todo" placeholder="What needs to be done?" autoFocus/>
            </label>
        </header>
    )
}


function Todos() {
    return (
        <section className="main" style={"display:none"}>
            <input type="checkbox" id="toggle-all" className={"toggle-all"}/>
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className={"todo-list"}></ul>
            <Footer/>
        </section>
    )
}

function Footer() {

    return (
        <footer className={"footer"}>
            <span className={"todo-count"}>
                <ul className={"filters"}>
                    <il>
                        <a href="#/" className={"selected"}>All</a>
                    </il>
                    <il>
                        <a href="#/active">Active</a>
                    </il>
                    <il>
                        <a href="#/completed">Completed</a>
                    </il>
                </ul>
                <button className={"clear-completed"}>Clear completed</button>
            </span>
        </footer>
    )
}
