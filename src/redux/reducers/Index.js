import { combineReducers } from "redux";
import tasks from "./Tasks";
import isDisplayForm from "./DisplayForm";
import taskEditing from "./TaskEditing"
import filter from "./TaskFilter";
import keyword from "./TaskSearch";
import sort from "./TaskSort";
const myReducer = combineReducers({
    tasks,
    isDisplayForm,
    taskEditing,
    filter,
    keyword,
    sort,
});

export default myReducer;