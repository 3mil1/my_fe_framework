import VDom from "../framework/Vdom";
import "./styles.css";

export function App({state}) {
    return (
        <section className="todoapp">
            <Header/>
            <Todos/>
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
