import VDom from "../framework/Vdom";
import "./styles.css";
import {Li} from "./li_example/li";
import { store } from "./store/store";
import { deleteLi, setLi, changeStatusLi } from './li_example/li_state';
let count = 0;
const dispatcher = store.dispatch.bind(store);

export function App({state}) {
    console.log(state.li_page);
    
    
    return (
      <section className={'todoapp'}>
        <Header />
        <Todos list={state.li_page.li} />
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
        <Footer />
      </section>
    );
}

function Footer() {

    //  Hash filters here

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


function TodoBox({todo}){
    const removeTodo = () => {
        dispatcher(deleteLi(todo.id))
    }
    const changeStatus = () => {
        dispatcher(changeStatusLi(todo.id));

    }
    return (
        <li key={todo.id}>
        <div className='view'>
            <input
            className='toggle'
            type='checkbox'
            onClick={changeStatus}
            ></input>
            <label> {todo.text} </label>
            <button className='destroy' onClick={removeTodo}></button>
        </div>
        </li>
    );
}

const newLi = (value) => { 
    count++;  
    return {
      id: count,
      text: value,
      active: true,
    };
}