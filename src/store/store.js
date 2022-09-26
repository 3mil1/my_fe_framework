import {liReducer} from "../li_example/li_state";
import {combineReducers, Store} from "../../framework/stateManagment";


export const store = new Store(combineReducers({
    li: liReducer,
}))
