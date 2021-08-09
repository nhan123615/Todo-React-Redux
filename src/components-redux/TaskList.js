import React, { Component } from "react";
import TaskItem from "./TaskItem";
import { connect } from "react-redux";
import * as actions from "./../redux/actions/Index";

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    onFilter = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.props.onFilter({
            name: (name === 'filterName') ? value : this.state.filterName,
            status: (name === 'filterStatus') ? value : this.state.filterStatus
        });
        this.setState({
            [name]: value
        });

    }

    onClear = (event) => {
        this.setState({
            filterName: ''
        }, () => this.onFilter(event))

    }

    render() {
        var { tasks, filter, sort, keyword } = this.props;
        const { filterName, filterStatus } = this.state;

        //filter
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
        //sorting
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
        //Searching

        if (keyword) {
            tasks = tasks.filter(task => {
                return task.name.toLowerCase().indexOf(keyword) !== -1
            })
        }



        const elmTasks = tasks.map((task, index) => {
            return (
                <TaskItem
                    key={index}
                    index={index}
                    task={task}
                />
            );
        })
        return (
            <div className="row" style={{ marginTop: 20 }}>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td className="clearable">
                                    <input
                                        type="text"
                                        name="filterName"
                                        className="form-control"
                                        value={filterName}
                                        onChange={this.onFilter}
                                    />
                                    {(filterName)
                                        ? <i className="clearable__clear"
                                            onClick={this.onClear}
                                            style={{ top: '10px' }}
                                        >
                                            <span className="fa fa-times"></span>
                                        </i>
                                        : ''}

                                </td>
                                <td>
                                    <select
                                        name="filterStatus"
                                        className="form-control"
                                        value={filterStatus}

                                        onChange={this.onFilter}
                                    >
                                        <option value={-1}>All</option>
                                        <option value={0}>InActive</option>
                                        <option value={1}>Active</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {elmTasks}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


const mapStateToProp = (state) => {
    return {
        tasks: state.tasks,
        filter: state.filter,
        sort: state.sort,
        keyword: state.keyword,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilter: (filter) => {
            dispatch(actions.filterTask(filter))
        },

    }
}

export default connect(mapStateToProp, mapDispatchToProps)(TaskList)
