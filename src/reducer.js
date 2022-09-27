import {todoInitialState} from "./state";

export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO"

export function todoReducer(state = todoInitialState, action) {
    console.log("Action", action);
    console.log("St", state);
    switch (action.type) {
        case ADD_TODO:
            state.active.push(action.active);
            return state;
        case COMPLETE_TODO:
            return {
                ...state,
                completed: action.completed,
            }
        default:
            return state;
    }
}

export function AddTodo(active) {
    return {
        type: ADD_TODO,
        active
    }
}