import VDom from "../framework/Vdom";
import "./styles.css";
import { AddTodo, todoReducer} from "./reducer";
import {store} from "../framework/store";
import {todoInitialState} from "./state";

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
                <input type="input" className="new-todo" placeholder="What needs to be done?" autoFocus onkeypress={(event)=>{
                    if (event.key === "Enter") {
                        // console.log("Current state",store.getState());
                        if (event.target.value.trim().length !== 0) {
                            // console.log(newTodo(event.target.value));
                            store.setState(todoReducer(todoInitialState, AddTodo(newTodo(event.target.value))));
                        }
                    }
                }}/>
            </label>
        </header>
    )
}


function Todos() {
    const activeTodos = store.getState().active;
    console.log(activeTodos);
    return (
        <section className="main" style={( activeTodos ? "" : "display:none")}>
            <input type="checkbox" id="toggle-all" className={"toggle-all"} />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className={"todo-list"}>
                {activeTodos
                    ? activeTodos.map((todo) => {
                   return (<li id={todo.id}>{todo.name}</li>)
                })
                :""}
            </ul>
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



function newTodo(name)  {
    let id = parseInt(localStorage.getItem("todo_id")) ||  0;
    localStorage.setItem("todo_id", 1 + id);
    return {
        id,
        name
    }
}