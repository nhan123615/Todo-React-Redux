import * as types from '../consts/ActionType';

var initialState = '';
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SEARCH_TASK:
            return action.keyword;
        default:
            return state;
    }
}

export default myReducer;