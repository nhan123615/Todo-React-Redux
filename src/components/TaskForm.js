import React, { Component } from "react";


class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false,
        };
    }

    componentDidMount() {
        if (this.props.taskEditing) {
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            })

        }
    }



    componentDidUpdate(prevProps) {
        if (prevProps.taskEditing !== this.props.taskEditing && this.props.taskEditing !==null ) {
            this.setState({
                id: this.props.taskEditing.id,
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status
            });
        }else if(prevProps.taskEditing !== this.props.taskEditing && this.props.taskEditing ===null ){
            this.setState({
                id: '',
                name: '',
                status: false,
            });
        }
    }

   
   




    onCloseForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = (target.value === 'true' ? true : false)
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        //Cancel and close form
        this.onClear();
        this.onCloseForm();
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        var { id } = this.state
        return (
            <div className="panel panel-warning">
                <div className="panel-heading" style={{ justifyContent: 'space-between', display: 'flex' }}>
                    <h3 className="panel-title ">
                        {(id !== '') ? 'Update Todo' : 'Add Todo'}

                    </h3>
                    <span
                        style={{ cursor: "pointer" }}
                        className="fa fa-times-circle text-right "
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

                                Cancel</button>
                        </div>


                    </form>
                </div>
            </div>
        );
    }
}


export default TaskForm
