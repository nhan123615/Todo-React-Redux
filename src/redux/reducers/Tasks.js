import * as types from '../consts/ActionType'

var UUID = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var generateUUID = () => {
    return UUID() + UUID() + UUID() + UUID() + UUID() + UUID();
}


var generateData = () => {
    const tasks = [
        {
            id: generateUUID(),
            name: 'todo 01',
            status: true
        },
        {
            id: generateUUID(),
            name: 'todo 02',
            status: false
        },
        {
            id: generateUUID(),
            name: 'todo 03',
            status: true
        }
    ];
    return tasks;
}

var findTaskIndex = (tasks, id) => {
    var rs = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            rs = index;
        }
    })
    return rs;

}

var initialData = () => {
    var tasks = [];
    if (localStorage && localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = generateData();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    return tasks;
}

var data = initialData();
var initialState = data ? data : [];
var myReducer = (state = initialState, action) => {
    var index = -1;
    switch (action.type) {
        case types.LIST_ALL_TASKS:
            return [...state];
        case types.SAVE_FORM_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if (!task.id) {//create
                task.id = generateUUID();
                state.push(task);
            } else {//update
                index = findTaskIndex(state, task.id);
                state[index] = task
            }

            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]

        case types.DELETE_TASK:
            index = findTaskIndex(state, action.task.id)
            state.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS_TASK:
            index = findTaskIndex(state, action.task.id)
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        default:
            return [...state];
    }
}

export default myReducer;