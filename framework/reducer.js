export function combineReducers(reducers) {
    return (state = {}, action) => {
        const result = {};
        Object.entries(reducers).forEach(([key, reducer]) => {
            result[key] = reducer(state[key], action);
        })
        return result;
    }
}