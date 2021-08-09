import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../redux/actions/Index";

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const { taskEditting } = this.props
        if (taskEditting) {
            this.setState({
                id: taskEditting.id,
                name: taskEditting.name,
                status: taskEditting.status
            })
        }else{
            this.onClear();
        }

    }


    componentDidUpdate(prvProps) {
        const { taskEditting } = this.props
        if (prvProps.taskEditting !== taskEditting && taskEditting) {
            this.setState({
                id: taskEditting.id,
                name: taskEditting.name,
                status: taskEditting.status
            })
        } else if (prvProps.taskEditting !== taskEditting && taskEditting === null) {
            this.onClear();
        }
    }


    onCloseForm = () => {
        this.props.onCloseForm();
        this.onClear();
    }

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = (target.value === 'true') ? true : false
        }
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.name !== '') {
            this.props.onSubmit(this.state);

            this.onCloseForm();
            this.onClear();

        }
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }
    render() {
        const { id } = this.state;
        var {isDisplayForm} = this.props;
        if (!isDisplayForm) return '';
        return (
            <div className="panel panel-warning">
                <div className="panel-heading" style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <h3 className="panel-title ">
                        {id ? 'Update Todo' : 'Add Todo'}
                    </h3>
                    <span
                        className="fa fa-times-circle text-right"
                        style={{ cursor: 'pointer' }}
                        onClick={this.onCloseForm}
                    ></span>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>

                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Input your todo name..."
                                value={this.state.name}
                                onChange={this.onChange}

                            />
                        </div>
                        <label>Status:</label>
                        <select
                            name="status"
                            className="form-control"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Active</option>
                            <option value={false}>InActive</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>&nbsp;

                                Save</button>&nbsp;
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >
                                <span className="fa fa-close mr-5"></span>&nbsp;

                                Clear</button>
                        </div>


                    </form>
                </div>
            </div>
        );
    }
}



const mapStateToProp = (state) => {
    return {
        taskEditting: state.taskEditing,
        isDisplayForm: state.isDisplayForm,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onCloseForm: () => {
            dispatch(actions.closeFormTask())
        },
        onSubmit: (task) => {
            dispatch(actions.saveFormTask(task))
        },
        
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(TaskForm)
