import * as types from '../consts/ActionType';

var initialState = {
    by: 'name',
    value: 1
};
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT_TASK:
            return action.sort;
        default:
            return state;
    }
}

export default myReducer;