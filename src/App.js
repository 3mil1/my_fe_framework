import VDom from '../framework/Vdom';
import './styles.css';
import {store} from './store/store';
import {localStorage} from './store/localStorage';
import {changeStatusTODO, deleteTODO, setTODO} from './todoMVC/todo_state';
import {Link} from '../framework/router';
import {history} from '.';


const dispatch = store.dispatch.bind(store);

export function App() {
    let state = store.getState();
    let todos = state.todo.li;

    //set changes in localStorage
    localStorage.store(state.todo.li);
    let activeTodos = todos.filter(todo => todo.active).length;

    return (
        <section className={'todoapp'}>
            <Header/>
            <Todos list={state.todo.li}/>
            <Footer activeCount={activeTodos} isEmpty={todos.length === 0}/>
            <GeneralFooter/>
        </section>
    );
}

function Header() {
    const addTodo = e => {
        let input = e.currentTarget.value.trim();
        if (e.key === 'Enter') {
            if (input) {
                let storeList = store.getState().todo.li ? store.getState().todo.li : [];
                let newArr = [...storeList, newTodo(input)];
                dispatch(setTODO(newArr));
            }
            e.currentTarget.value = '';
        }
    };

    return (
        <header className={'header'}>
            <h1>todos</h1>
            {/* <label htmlFor=""> */}
            <input
                type='input'
                className='new-todo'
                placeholder='What needs to be done?'
                autoFocus
                onKeyUp={addTodo}
            />
            {/* </label> */}
        </header>
    );
}

function Todos({list}) {

    const setAllActiveStatus = () => {
        let newList = localStorage.getAll();
        let isSomeActive = newList.some(el => el.active)
        let isAllActive = newList.every(el => el.active)
        if (isAllActive){
              newList.forEach(todo => {
                    if (todo.active) dispatch(changeStatusTODO(todo.id));
                });
        }else{
            if (isSomeActive) {
                newList.forEach(todo => {
                    if (todo.active) dispatch(changeStatusTODO(todo.id));
                });
            } else {
                newList.forEach(todo => {
                    if (!todo.active) dispatch(changeStatusTODO(todo.id));
                });
            }
        }
        // localStorage.store(newList);
    }

    let currentPage = store.state.location.current.substring(1);
    switch (currentPage) {
        case 'active':
            list = list.filter(el => el.active);
            break;
        case 'completed':
            list = list.filter(el => !el.active);
            break;
        default:
            list = store.state.todo.li;
            break;
    }

    return (
        <section className='main' style={list === null || list.length === 0 ? 'display:none' : ''}>
            <input type='checkbox' id='toggle-all' className='toggle-all' onClick={setAllActiveStatus}/>
            <label htmlFor='toggle-all'>Mark all as complete</label>
            <ul className={'todo-list'}>
                {list ? list.map(el => {
                    return <TodoBox todo={el}/>
                }) : 'nothing to show'}
            </ul>
        </section>
    );
}

function Footer({activeCount, isEmpty}) {
    const isSomethingToRemove = activeCount != store.state.todo.li.length;
    const filter = store.state.location.current.substring(1);
    const clearCompleted = () => {
        store.state.todo.li.forEach(todo => {
            if (!todo.active) {
                dispatch(deleteTODO(todo.id));
            }
        });
    };

    return (
        <footer className={'footer'} style={isEmpty? "display:none" : ""}>
        <span className={'todo-count'}>
            {activeCount} {activeCount === 1 ? "item" : "items"} left
        </span>

            <ul className={'filters'}>
                <li className={filter !== 'active' && filter !== 'completed' ? "selected": ""}><Link history={history} to='/'>All</Link></li>
                <li className={filter === 'active'? "selected" : ""}><Link history={history} to='/active'>Active</Link></li>
                <li className={filter ==='completed' ? "selected" : ""}><Link history={history} to='/completed'>Completed</Link></li>
            </ul>

            {isSomethingToRemove ?
                <button className={'clear-completed'} onClick={clearCompleted}> Clear completed </button> : ""}

            {/* <Route path={'/active'} location={location}>
            <div>hallejualajjs</div>
        </Route> */}
        </footer>
    );
}

function TodoBox({todo}) {
    const editTodo = (e) => {
        // console.log("on dbl", e);
        todo.isEditing = true;
        dispatch(todo);
    };

    const removeTodo = () => {
        dispatch(deleteTODO(todo.id))
    };
    const changeStatus = () => {
        dispatch(changeStatusTODO(todo.id))
    };

    const stopEditing = e => {
        if (e.key === 'Enter' || e.type ==="change") {
            let input = e.currentTarget.value.trim();
            todo.isEditing = false;
            todo.text = input;
            return input != "" ? dispatch(todo) : removeTodo(todo.id)
        }
        if (e.key === 'Escape' || e.type ==="blur") {
            todo.isEditing = false;
            return dispatch(todo);
        }
    };

    const stopAllEditing = () => {
        let state = store.getState();
        let todos = state.todo.li;
        for (let el of todos) {
            if (el.isEditing === true) {
                el.isEditing = false
                return dispatch(todos)
            }
        }
    }

    return (
        <li key={todo.id} className={todo.active ? '' : 'completed'}>
            <div className='view'>
                <input className='toggle' type='checkbox' checked={!todo.active} onClick={changeStatus}></input>
                {todo.isEditing ?
                    <input className='isEditing' autofocus="autofocus" value={todo.text}
                           onKeyUp={stopEditing}
                           onBlur={(e) => {stopEditing(e)}}
                        onChange={(e) => {stopEditing(e)}}>

                    </input>
                    :
                    <div>
                        <label onDblClick={editTodo} onClick={stopAllEditing}> {todo.text}  </label>
                        <button className='destroy' onClick={removeTodo}></button>
                    </div>
                }
            </div>
        </li>
    );
}

const newTodo = value => {
    return {
        id: Date.now(),
        text: value,
        active: true,
        isEditing: false,
    };
};

function GeneralFooter() {
    return (
        <footer className='info'>
            <p> Double-click to edit a todo</p>
            <p> Created by Emil & Silver & Valeria & Anna</p>
        </footer>
    );
}

function NotFound() {
    return <div>Not found!</div>;
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
