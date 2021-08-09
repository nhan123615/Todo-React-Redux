import React, { Component } from "react";
import Control from "./components/Control";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {findIndex} from "lodash";

class Demo17 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1,
            },
            keyword: '',
            sort: {
                by: 'name',
                value: 1
            },

        }
    }

    //life cycle hook
    componentDidMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    }

    onGenerateData = () => {
        var tasks = [
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

        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    UUID() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateUUID() {
        return this.UUID() + this.UUID() + this.UUID() + this.UUID() + this.UUID() + this.UUID()
    }


    onToggleForm = (event) => {
        if (this.state.isDisplayForm && this.state.taskEditing !== null) {
            this.setState({
                isDisplayForm: true,
                taskEditing: null
            });
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            });
        }


    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        });
    }

    onShowForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }


    onSubmit = (value) => {
        var { tasks } = this.state;//var tasks = this.state.tasks
        if (value.id === '') {
            value.id = this.generateUUID();
            tasks.push(value);
        } else {
            var index = this.findIndex(value.id);
            tasks[index] = value;
        }

        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onUpdateStatus = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
            this.onCloseForm();
        }

    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1)
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
            this.onCloseForm();
        }
    }

    onUpdate = (id) => {
        var { tasks } = this.state;
        // var index = this.findIndex(id);
        const index= findIndex(tasks,task=>task.id===id);

        this.setState({
            taskEditing: tasks[index]
        });
        this.onShowForm();
    }


    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus,
            }
        });
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword.toLowerCase()
        })
    }

    onSort = (sort) => {
        this.setState({
            sort: {
                by: sort.by,
                value: sort.value
            }
        })
    }


    render() {
        var { tasks, isDisplayForm, taskEditing, filter, keyword, sort } = this.state // var tasks = this.state.tasks
        if (filter) {
            if (filter.name) {//!==null, !==undefine !==0
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                })
                // tasks = filter(tasks,task=>task.name.toLowerCase().indexOf(filter.name)!==-1);

            }

            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false)
                }
            })
        }

        if (keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            })
        }

        if (sort.by === 'name') {
            tasks.sort((a, b) => {//sort asc sortvalue = 1
                if (a.name > b.name) return sort.value;
                else if (a.name < b.name) return sort.value;
                else return 0;
            });
        } else {
            tasks.sort((a, b) => {//sort asc sortvalue = 1
                if (a.status > b.status) return -sort.value;
                else if (a.status < b.status) return sort.value;
                else return 0;
            });
        }



        var elmTaskForm = (isDisplayForm) ? <TaskForm
            onCloseForm={this.onCloseForm}
            onSubmit={this.onSubmit}
            taskEditing={taskEditing}
        /> : ''
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Todo Management</h1>
                </div>

                <div className="row" style={{ marginTop: 50 }}>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        {elmTaskForm}
                    </div>

                    <div className={(isDisplayForm) ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span>&nbsp;
                            Add Todo</button>
                        &nbsp;
                        {/* <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.onGenerateData()}
                >
                    Generate Data</button> */}

                        <Control
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                        />

                        <TaskList
                            tasks={tasks}
                            onUpdateStatus={this.onUpdateStatus}
                            onDelete={this.onDelete}
                            onUpdate={this.onUpdate}
                            onFilter={this.onFilter}

                        />
                    </div>
                </div>
            </div>

        );
    }
}


export default Demo17
