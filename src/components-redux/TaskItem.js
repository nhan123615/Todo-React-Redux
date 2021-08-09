import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../redux/actions/Index";

class TaskItem extends Component {
    onDelete = (task)=>{
        this.props.onDelete(task);
    }

    onEdit = (task)=>{
        this.props.onEdit(task);
        this.props.onOpenForm();
    }

    onUpdateStatus = (task)=>{
        this.props.onUpdateStatus(task);
    }
    render() {
        const {task,index} = this.props;
        return (
            <tr>
                <td>{index +1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                {(task.status)
                ?<span onClick={()=>this.onUpdateStatus(task)} className="label label-success"  style={{cursor:"pointer"}}>Active</span>
                :<span onClick={()=>this.onUpdateStatus(task)} className="label label-danger"  style={{cursor:"pointer"}}>InActive</span>}
                    
                </td>
                <td className="text-center">
                    <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick ={()=>this.onEdit(task)}
                    >Edit&nbsp;
                        <span className="fa fa-pencil mr-5"></span>
                    </button>
                    &nbsp; &nbsp;
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick ={()=>this.onDelete(task)}
                    >Delete&nbsp;
                        <span className="fa fa-trash mr-5"></span>
                    </button>
                </td>
            </tr>
        );
    }
}



const mapStateToProp = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onEdit:(task)=>{
            dispatch(actions.editFormTask(task))
        },
        onOpenForm:()=>{
            dispatch(actions.openFormTask())
        },
        onDelete:(task)=>{
            dispatch(actions.deleteTask(task))
        },
        onUpdateStatus:(task)=>{
            dispatch(actions.updateStatusTask(task))
        }

    }
}

export default connect(mapStateToProp, mapDispatchToProps)(TaskItem)
