import {localStorage} from '../store/localStorage'

const SET_TODO = 'SET_TODO'
const DELETE_TODO = 'DELETE_TODO'
const STATUS_TODO = 'STATUS_TODO';

// localStorage.removeAll()

// Set Initial list from local storage
const list = localStorage.getAll()
const liInitialState = {li: list}

export function todoReducer(state = liInitialState, action) {
    switch (action.type) {
        case SET_TODO:
            return {
                li: action.li,
            };
        case DELETE_TODO: {
            return {
                li: state.li.filter(el => {
                    return el.id !== action.id;
                })
            };
        }
        case STATUS_TODO: {
            return {
                li: state.li.map(el => {
                    if (el.id === action.id) el.active = !el.active;
                    return el
                }),
            };
        }
        default:
            return state;
    }
}

export function setTODO(li) {
    return {
        type: SET_TODO,
        li
    }
}

export function deleteTODO(id) {
    return {
        type: DELETE_TODO,
        id
    }
}

export function changeStatusTODO(id) {
    return {
        type: STATUS_TODO,
        id
    }
}