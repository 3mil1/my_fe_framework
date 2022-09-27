const SET_LOCATION = 'SET_LOCATION'

const locationInitialState = {current: window.location.pathname}

export function locationReducer(state = locationInitialState, action) {
    switch (action.type) {
        case SET_LOCATION:
            return {
                current: action.location
            }
        default:
            return state
    }
}

export function setLocation(location) {
    return {
        type: SET_LOCATION,
        location
    }
}