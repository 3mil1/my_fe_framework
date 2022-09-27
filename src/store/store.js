import {combineReducers, Store} from "../../framework/stateManagment";
import {liReducer} from "../li_example/li_state";
import {locationReducer} from "../router/router_state";


export const store = new Store(combineReducers({
    li_page: liReducer,
    location: locationReducer,
}))


