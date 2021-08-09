import React, { Component } from "react";
import Control from "./componentTodo/Control";
import TaskForm from "./componentTodo/TaskForm";
import TaskList from "./componentTodo/TaskList";


class Demo18 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isOpen: false,
            taskEditting: null,
            filter: {
                name: '',
                status: -1
            },
            keyword: '',
            sort: {
                by: 'name',
                value: 1
            }
        }
    }

    componentDidMount() {
        var tasks = [];
        if (localStorage && localStorage.getItem('tasks')) {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        } else {
            tasks = this.generateData();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.setState({
            tasks: tasks
        })
    }



    generateData() {
        const tasks = [
            {
                id: this.generateUUID(),
                name: 'todo 01',
                status: true
            },
            {
                id: this.generateUUID(),
                name: 'todo 02',
                status: false
            },
            {
                id: this.generateUUID(),
                name: 'todo 03',
                status: true
            }
        ];

        return tasks;
    }

    UUID() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateUUID() {
        return this.UUID() + this.UUID() + this.UUID() + this.UUID() + this.UUID() + this.UUID();
    }

    onToggleForm = () => {
        const { taskEditting } = this.state;

        if (taskEditting !== null) {
            this.setState({
                isOpen: true,
                taskEditting: null
            });
        } else {
            this.setState({
                isOpen: !this.state.isOpen,
                taskEditting: null
            });
        }

    }

    onShowForm = () => {
        this.setState({
            isOpen: true
        });
    }

    onCloseForm = () => {
        this.setState({
            isOpen: false
        });
    }

    onSubmit = (value) => {
        var { tasks } = this.state;
        if (value.id) {
            //update 
            const index = this.findTaskIndex(value.id);
            tasks[index] = value;
        } else {
            value.id = this.generateUUID();
            tasks.push(value)
        }

        this.saveToStateAndLocal(tasks);
    }

    onDelete = (id) => {
        const { tasks } = this.state;
        const index = this.findTaskIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.saveToStateAndLocal(tasks);
        }

    }

    onEdit = (id) => {
        const { tasks } = this.state;
        const index = this.findTaskIndex(id);
        if (index !== -1) {
            this.setState({
                taskEditting: tasks[index]
            })
            this.onShowForm();
        }

    }





    saveToStateAndLocal(tasks) {
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    findTaskIndex(id) {
        var rs = -1;
        this.state.tasks.forEach((task, index) => {
            if (task.id === id) {
                rs = index;
            }
        })
        return rs;

    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })
    }

    onSort = (by, value) => {
        this.setState({
            sort: {
                by: by,
                value: value
            }
        })
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword.toLowerCase()
        })
    }

    onUpdateStatus = (id) => {
       var {tasks} = this.state;
       const index = this.findTaskIndex(id);
       tasks[index].status = !this.state.tasks[index].status;
       this.saveToStateAndLocal(tasks);
    }
    render() {
        var { tasks, isOpen, taskEditting, filter, keyword, sort } = this.state;


        if (filter) {

            if (filter.name) {//!==null, !==undefine !==0
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                })
            }

            tasks = tasks.filter(task => {
                if (filter.status === -1) {
                    return tasks
                } else {
                    return task.status === (filter.status === 1) ? true : false
                }
            })
        }

        if (keyword) {
            tasks = tasks.filter(task => {
                return task.name.toLowerCase().indexOf(keyword) !== -1
            })
        }

        if (sort.by === 'name') {
            tasks = tasks.sort((a, b) => {
                if (sort.value === 1) {
                    return a.name[0].localeCompare(b.name[0]);
                } else {
                    return b.name[0].localeCompare(a.name[0]);
                }
            })
        } else {
            tasks = tasks.sort((a, b) => {
                if (a.status > b.status) return -sort.value
                else if (b.status > a.status) return sort.value
                else return 0
            })
        }



        return (
            <div className="container">
                <div className="text-center">
                    <h1>Todo Management</h1>
                </div>

                <div className="row" style={{ marginTop: 50 }}>
                    {isOpen
                        ?
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            <TaskForm
                                onCloseForm={this.onCloseForm}
                                onSubmit={this.onSubmit}
                                taskEditting={taskEditting}
                            />
                        </div>
                        : ''}

                    <div className={isOpen ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span>&nbsp;
                            Add Todo</button>
                        <Control
                            onSearch={this.onSearch}
                            onSort={this.onSort}

                        />
                        <TaskList
                            tasks={tasks}
                            onDelete={this.onDelete}
                            onEdit={this.onEdit}
                            onFilter={this.onFilter}
                            onUpdateStatus={this.onUpdateStatus}
                        />
                    </div>
                </div>
            </div>

        );
    }
}


export default Demo18
