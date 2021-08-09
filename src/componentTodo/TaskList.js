import React, { Component } from "react";
import TaskItem from "./TaskItem";


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
        this.props.onFilter(
            (name === 'filterName') ? value : this.state.filterName,
            (name === 'filterStatus') ? value : this.state.filterStatus
        );
        this.setState({
            [name]: value
        });
    }

    onClear = (event)=>{
        this.setState({
            filterName:''
        },()=>  this.onFilter(event))
      
    }

    render() {
        const { tasks, onDelete, onEdit, onUpdateStatus } = this.props;
        const { filterName, filterStatus } = this.state;
        const elmTasks = tasks.map((task, index) => {
            return (
                <TaskItem
                    key={index}
                    index={index}
                    task={task}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onUpdateStatus={onUpdateStatus}
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

export default TaskList
