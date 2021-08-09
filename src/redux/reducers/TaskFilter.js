import * as types from '../consts/ActionType';

var initialState = {
    name: '',
    status: -1
};
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_TASK:
            action.filter.status = parseInt(action.filter.status,10);
            return action.filter;
        default:
            return state;
    }
}

export default myReducer;