import React, { Component } from "react";
import Control from "./components-redux/Control";
import TaskForm from "./components-redux/TaskForm";
import TaskList from "./components-redux/TaskList";
import { connect } from "react-redux";
import * as actions from "./redux/actions/Index";

class Todo extends Component {

    onToggleForm = () => {
        const { taskEditting } = this.props;
        if (taskEditting && taskEditting.id !== '') {
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        });

    }


    render() {
        var { isOpen } = this.props
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Todo Management Upgrade From ReactJs To React-Redux</h1>
                </div>

                <div className="row" style={{ marginTop: 50 }}>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        <TaskForm />
                    </div>
                    <div className={isOpen ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>

                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                        >
                            <span className="fa fa-plus mr-5"></span>&nbsp;
                            Add Todo</button>
                        <Control />
                        <TaskList />
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProp = (state) => {
    return {
        isOpen: state.isDisplayForm,
        taskEditting: state.taskEditing,

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleFormTask())
        },
        onOpenForm: () => {
            dispatch(actions.openFormTask())
        },
        onClearTask: (task) => {
            dispatch(actions.editFormTask(task))
        }
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(Todo)
