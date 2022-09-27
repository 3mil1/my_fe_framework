import VDom from "../framework/Vdom";
import "./styles.css";
import {AddTodo, CompleteAll, CompleteTodo, DeleteTodo, todoReducer} from "./reducer";
import {store} from "./state";
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
                <input type="input" className="new-todo" placeholder="What needs to be done?" autoFocus onkeypress={
                    (event)=>{
                    if (event.key === "Enter") {
                        // console.log("Current state",store.getState());
                        if (event.target.value.trim().length !== 0) {
                            // console.log(newTodo(event.target.value));
                            store.dispatch(todoReducer(todoInitialState, AddTodo(newTodo(event.target.value))));
                        }
                        event.target.value  = "";
                    }
                }}
                />
            </label>
        </header>
    )
}


function Todos() {
    const currentState = store.getState().task
    const activeTodos = currentState.todos;
    console.log("Here", activeTodos)
    //     console.log("Length", activeTodos.length);
    return (
        <section className="main" style={( activeTodos.length !== 0 ? "" : "display:none")}>
            <input type="checkbox" id="toggle-all" className={"toggle-all"} />
            <label htmlFor="toggle-all" onclick = {() =>  store.dispatch(CompleteAll())}>Mark all as complete</label>
            <ul className={"todo-list"}>
                {activeTodos
                    ? activeTodos.map((todo) => {
                   return (
                       <li className={todo.completed ? "todo-list completed" : "todo-list"} id={todo.id}  key={todo.id}>
                       <div className={"view"}>
                           <input type={"checkbox"} className={"toggle"} checked={todo.completed} onclick = { () => {
                               store.dispatch(CompleteTodo(todo.id));
                           }}/>
                       <label>{todo.name}</label>
                       <button className={"destroy"} onclick = {() => {
                           store.dispatch(DeleteTodo(todo.id));
                       }}></button>
                       </div>
                       </li>)
                })
                :""}
            </ul>
            <Footer/>
        </section>
    )
}

function Footer() {
    const todoCount = store.getState().task.todos.filter(todo => !todo.completed).length;
    return (
        <footer className={"footer"}>
            <span className={"todo-count"}>{todoCount} {todoCount > 1 ? "items" : "item"} left</span>
                <ul className={"filters"}>
                    <li>
                        <a href="#/" className={"selected"}>All</a>
                    </li>
                    <li>
                        <a href="#/active">Active</a>
                    </li>
                    <li>
                        <a href="#/completed">Completed</a>
                    </li>
                </ul>
                <button className={"clear-completed"} style={"display: none"}>Clear completed</button>
        </footer>
    )
}



function newTodo(name)  {
    let id = parseInt(localStorage.getItem("todo_id")) ||  0;
    localStorage.setItem("todo_id", 1 + id);
    return {
        id,
        name,
        completed: false,
    }
}

// function toggleAll(todos) {
//     console.log("Todos",  todos);
//    return todos.map((todo) => {
//             return {
//                 ...todo,
//                 completed: true
//             }
//     })
// }

