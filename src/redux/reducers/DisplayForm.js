import * as types from './../consts/ActionType';

var initialState = false;
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_FORM_TASK:
            return !state;

        case types.OPEN_FORM_TASK:
            return true;

        case types.CLOSE_FORM_TASK:
            return false;
            
        default:
            return state;
    }
}

export default myReducer;