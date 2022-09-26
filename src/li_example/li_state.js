const SET_LI = 'SET_LI'
const DELETE_LI = 'DELETE_LI'

const liInitialState = {
    li: null
}

export function liReducer(state = liInitialState, action) {
    switch (action.type) {
        case SET_LI:
            return {
                li: action.li
            }
        case DELETE_LI: {
            return {
                li: state.li.filter(el => {
                    return el.id !== action.id
                })
            }
        }
        default:
            return state
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