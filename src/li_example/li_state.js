import {localStorage} from '../store/localStorage'

const SET_LI = 'SET_LI'
const DELETE_LI = 'DELETE_LI'
const STATUS_LI = 'STATUS_LI';

// localStorage.removeAll()
// Set Initial list from local storage
const list = localStorage.getAll()
const liInitialState = {li: list}

export function liReducer(state = liInitialState, action) {
    switch (action.type) {
      case SET_LI:
        return {
          li: action.li,
        };
      case DELETE_LI: {
        return {
          li: state.li.filter(el => {
            return el.id !== action.id;
          })
        };
      }
      case STATUS_LI: {
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

export function setLi(li) {
    return {
        type: SET_LI,
        li
    }
}

export function deleteLi(id) {
    return {
        type: DELETE_LI,
        id
    }
}

export function changeStatusLi(id) {
    return {
        type: STATUS_LI,
        id
    }
}