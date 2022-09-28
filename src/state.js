import {Store} from "../framework/store";
import {filtersReducer, todoReducer} from "./reducer";
import {combineReducers} from "../framework/reducer";

export const todoInitialState = {
    todos: [],
}

export const FILTER_ALL = "FILTER_ALL";
export const FILTER_COMPLETED = "FILTER_COMPLETED";
export const FILTER_ACTIVE = "FILTER_ACTIVE";

export const filtersInitialState =
    {
    activeFilter: getFilter(),
};

export const store = new Store(combineReducers({
    task: todoReducer,
    filters: filtersReducer,
}));

function getFilter() {
    switch (document.location.hash.replace("#", "")) {
        case "/active":
            return FILTER_ACTIVE;

        case "/completed":
            return FILTER_COMPLETED;
        default:
            return FILTER_ALL;
    }

}
