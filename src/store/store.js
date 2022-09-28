import {combineReducers, Store} from "../../framework/application_state";
import {locationReducer} from "../router/router_state";
import {todoReducer} from "../todoMVC/todo_state";

export const store = new Store(combineReducers({
    todo: todoReducer,
    location: locationReducer,
}))



