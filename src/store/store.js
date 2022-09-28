import {combineReducers, Store} from "../../framework/application_state";
import {liReducer} from "../li_example/li_state";
import {locationReducer} from "../router/router_state";
import {todoReducer} from "../todoMVC/todo_state";

export const store = new Store(combineReducers({
    // li_page: liReducer,
    todo: todoReducer,
    location: locationReducer,
}))



