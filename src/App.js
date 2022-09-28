import VDom from "../framework/Vdom";
import "./styles.css";
import {Li} from "./li_example/li";
import {store} from "./store/store";
import {setLocation} from "./router/router_state";
import {Link, Route} from "../framework/router";
import {history} from "./index";
import { deleteLi, setLi, changeStatusLi } from './li_example/li_state';
import { localStorage } from "../src/store/localStorage";

const dispatcher = store.dispatch.bind(store);

export function App() {
    let state = store.getState();
    let location = state.location.current
    const dispatch = store.dispatch.bind(store)

    const navigate = (location) => {
        dispatch(setLocation(location))
    }

    //set changes in localStorage
    localStorage.store(state.li_page.li)

    return (
        <section className={'todoapp'}>
            <Header/>
            <Todos list={state.li_page.li}/>
            <GeneralFooter/>
        </section>
    );
}

function Header() {
    const addTodo = (e) => {
        let input = e.currentTarget.value.trim()
        if (e.key == 'Enter'){
            if (input){
                let storeList = store.getState().li_page.li ? store.getState().li_page.li : [];
                let newArr = [...storeList, newLi(input)];
                dispatcher(setLi(newArr));
            }
            e.currentTarget.value = '';
        }
    }

    return (
        <header className={"header"}>
            <h1>todos</h1>
            {/* <label htmlFor=""> */}
            <input type="input" className="new-todo" placeholder="What needs to be done?" autoFocus onKeyup={addTodo}/>
            {/* </label> */}
        </header>
    )
}


function Todos({list}) {
    return (
        <section className='main' style={list == null  || list.length == 0 ? 'display:none' : ""}>
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <input type='checkbox' id='toggle-all' className={'toggle-all'} />
            <ul className={'todo-list'}>
                {list ? list.map(el => { return <TodoBox todo={el} /> }) : 'nothing to show' }
            </ul>
            <Footer list = {list}/>
        </section>
    );
}

function Footer({list}) {
    let active
    if (list != null){
        active = list.filter((el) => {return el.active == true}).length
    }
    return (
        <footer className={"footer"}>
            <span className={"todo-count"}> <strong>{active}</strong>  items left
            </span>
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
        </footer>
    )
}


function TodoBox({todo}){
    const editTodo = () =>{
        todo.isEditing = true
        dispatcher(todo)
    }

    const removeTodo = () => {
        dispatcher(deleteLi(todo.id))
    }
    const changeStatus = () => {
        dispatcher(changeStatusLi(todo.id));
    }

    const stopEditing= (e) =>{
        if (e.key == 'Enter'){
            let input = e.currentTarget.value.trim()
            todo.isEditing = false
            todo.text = input
            dispatcher(todo)
        }
    }

    if (todo.isEditing){
        return (
            <li key={todo.id} className={todo.active ? "" : "completed" }>
                <div className='view'>
                    <input
                        className='toggle'
                        type='checkbox'
                        checked = {todo.active ? false : true}
                        onClick={changeStatus}
                    ></input>
                    <input className ="isEditing" autoFocus value = {todo.text} onKeyup={stopEditing}></input>
                </div>
            </li>
        )
    } else {
        return (
            <li key={todo.id} className={todo.active ? "" : "completed" }>
                <div className='view'>
                    <input
                        className='toggle'
                        type='checkbox'
                        checked = {todo.active ? false : true}
                        onClick={changeStatus}
                    ></input>
                    <label ondblclick={editTodo}> {todo.text} </label>
                    <button className='destroy' onClick={removeTodo}></button>
                </div>
            </li>
        );
    }
}

const newLi = (value) => {
    return {
        id: Date.now(),
        text: value,
        active: true,
        isEditing: false
    };
}


function GeneralFooter() {
    return (
        <footer className="info">
            <p>Double-click to edit a todo</p>
            <p> Created by Emil & Silver & Valeia & Anna</p>
        </footer>
    )
}


function NotFound() {
    return <div>Not found!</div>
}


// <div>
//     <ul>
//         <li><Link navigate={navigate} history={history} to="/">LI</Link></li>
//         <li><Link navigate={navigate} history={history} to="/page_not_exist">404 page</Link></li>
//     </ul>
//
//     <div>
//         <Route path={"/page_not_exist"} location={location}><NotFound/></Route>
//         <Route path={"/"} location={location}><Li/></Route>
//     </div>
// </div>

