import {Store} from "../framework/store";
import {filtersReducer, todoReducer} from "./reducer";
import {combineReducers} from "../framework/reducer";

export const todoInitialState = {
    todos: [],
}

export const filtersInitialState = {
    filters : {
        all: true,
        active: false,
        completed: false,
    },
}

export const store = new Store(combineReducers({
    task: todoReducer,
    // filters: filtersReducer,
}));