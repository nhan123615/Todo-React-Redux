import * as types from './../consts/ActionType';

export const listAllTasks = () => {
    return {
        type: types.LIST_ALL_TASKS,
    }
}

export const toggleFormTask = () => {
    return {
        type: types.TOGGLE_FORM_TASK,
    }
}

export const openFormTask = () => {
    return {
        type: types.OPEN_FORM_TASK,
    }
}

export const closeFormTask = () => {
    return {
        type: types.CLOSE_FORM_TASK,
    }
}

export const saveFormTask = (task) => {
    return {
        type: types.SAVE_FORM_TASK,
        task
    }
}

export const editFormTask = (task) => {
    return {
        type: types.EDIT_FORM_TASK,
        task
    }
}

export const deleteTask = (task) => {
    return {
        type: types.DELETE_TASK,
        task
    }
}

export const updateStatusTask = (task) => {
    return {
        type: types.UPDATE_STATUS_TASK,
        task
    }
}

export const filterTask = (filter) => {
    return {
        type: types.FILTER_TASK,
        filter
    }
}

export const sortTask = (sort) => {
    return {
        type: types.SORT_TASK,
        sort
    }
}

export const searchTask = (keyword) => {
    return {
        type: types.SEARCH_TASK,
        keyword
    }
}
