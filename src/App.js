import VDom from "../framework/Vdom";
import "./styles.css";
import {store} from "./state";

export function App({state}) {

    const del = () => {
        store.changeState((state) => {
            state.li.reverse()
            state.li.splice(2, 1)
        })
    }

    const deleteId = (id) => {
        store.changeState((state) => {
            const indexOfObject = state.li.findIndex(object => {
                return object.id === id;
            });

            state.li.splice(indexOfObject, 1)
        })
    }

    return (
        <section className="todoapp">
            {/*<Header/>*/}
            {/*<Todos/>*/}
            <ul>
                {state.li.map(el => {
                    return <li key={el.id} onClick={() => {

                        deleteId(el.id)
                        console.log(state.li)
                        console.log(el)
                    }
                    }>{el.text}</li>
                })}

                {/*<li key={2}>2</li>*/}
                {/*<li key={3}>3</li>*/}
            </ul>

            <button onClick={deleteId}>DEL</button>
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
