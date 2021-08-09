import * as types from './../consts/ActionType';

var initialState = {
    id:'',
    name:'',
    status:false
};
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.EDIT_FORM_TASK:
            return action.task;
        default:
            return state;
    }
}

export default myReducer;