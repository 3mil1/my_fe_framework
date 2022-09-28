import VDom from "../framework/Vdom";
import "./styles.css";
import {AddTodo, CompleteAll, CompleteTodo, DeleteTodo, SwitchFilter, todoReducer} from "./reducer";
import {FILTER_ACTIVE, FILTER_ALL, FILTER_COMPLETED, store} from "./state";
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
    const currentFilter = store.getState().filters.activeFilter;
    const todos = currentState.todos.filter((todo) => {
        return currentFilter === FILTER_ALL
            || currentFilter === FILTER_COMPLETED && todo.completed
            || currentFilter === FILTER_ACTIVE && !todo.completed;
    });
    // console.log("Here", activeTodos)
    //     console.log("Length", activeTodos.length);
    return (
        <section className="main" style={( todos.length !== 0 ? "" : "display:none")}>
            <input type="checkbox" id="toggle-all" className={"toggle-all"} />
            <label htmlFor="toggle-all" onclick = {() =>  store.dispatch(CompleteAll())}>Mark all as complete</label>
            <ul className={"todo-list"}>
                {todos
                    ? todos.map((todo) => {
                   return (
                       <li className={todo.completed ? "todo-list completed" : "todo-list"} id={todo.id}  key={todo.id}
                       ondblclick={() => {console.log("CLICKED!")}}>
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
    const currentFilter = store.getState().filters.activeFilter;
    console.log("CF", currentFilter);
    return (
        <footer className={"footer"}>
            <span className={"todo-count"}>{todoCount} {todoCount === 1 ? "item" : "items"} left</span>
                <ul className={"filters"}>
                    <li>
                        <a href="#/" className={currentFilter === FILTER_ALL ? "selected" : ""}
                           onclick={()=> store.dispatch(SwitchFilter(FILTER_ALL))}>
                            All
                        </a>
                    </li>
                    <li>
                        <a href="#/active" className={currentFilter === FILTER_ACTIVE ? "selected" : ""}
                           onclick={()=> store.dispatch(SwitchFilter(FILTER_ACTIVE))}>
                            Active
                        </a>
                    </li>
                    <li>
                        <a href="#/completed" className={currentFilter === FILTER_COMPLETED ? "selected" : ""}
                           onclick={()=> store.dispatch(SwitchFilter(FILTER_COMPLETED))}>
                            Completed
                        </a>
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

