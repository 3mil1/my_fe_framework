import {filtersInitialState, todoInitialState} from "./state";

export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const COMPLETE_ALL = "COMPLETE_ALL";
export const DELETE_TODO = "DELETE_TODO";

export function todoReducer(state = todoInitialState, action) {
    console.log("Action", action);
    switch (action.type) {
        case ADD_TODO:
            state.todos.push(action.newTodo);
            return state;

        case COMPLETE_TODO:
            const index = state.todos.findIndex(data => data.id === action.id);
            if (index >= 0) {
                state.todos[index].completed = !state.todos[index].completed;
            }
            return state;

        case COMPLETE_ALL:
            console.log("Complete all", state.todos);
            let completed = state.todos.some(todo => !todo.completed)
            let s = {
                todos: state.todos.map(todo => {
                return {
                    ...todo,
                    completed: completed,
                }
            })}
            console.log("CA after map", s);
            return  s;
        case DELETE_TODO: {
            console.log(state.todos);
           state.todos = state.todos.filter(data => data.id !== action.id);
           return state;
        }
        default:
            return state;
    }
}

export const SWITCH_FILTER = "SWITCH_FILTER";

export function filtersReducer(state = filtersInitialState,  action) {
    switch (action.type) {
        case SWITCH_FILTER:
            state.activeFilter = action.name;
            return state;
        default:
            return state;
    }
    // console.log("Filter reducer", state, action);
    // return state;
}

//Action creators
export function AddTodo(newTodo) {
    return {
        type: ADD_TODO,
        newTodo
    }
}

export function DeleteTodo(id)  {
    return {
        type: DELETE_TODO,
        id
    }
}

export function CompleteTodo(id) {
    return {
        type: COMPLETE_TODO,
        id
    }
}

export function CompleteAll() {
    return {
        type: COMPLETE_ALL,
    }
}

export function SwitchFilter(name) {
    return {
        type: SWITCH_FILTER,
        name
    }
}