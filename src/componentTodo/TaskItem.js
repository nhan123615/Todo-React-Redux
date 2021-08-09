import React, { Component } from "react";


class TaskItem extends Component {
    onDelete = (id)=>{
        this.props.onDelete(id);
    }

    onEdit = (id)=>{
        this.props.onEdit(id);
    }

    onUpdateStatus = (id)=>{
        this.props.onUpdateStatus(id);
    }
    render() {
        const {task,index} = this.props;
        return (
            <tr>
                <td>{index +1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                {(task.status)
                ?<span onClick={()=>this.onUpdateStatus(task.id)} className="label label-success"  style={{cursor:"pointer"}}>Active</span>
                :<span onClick={()=>this.onUpdateStatus(task.id)} className="label label-danger"  style={{cursor:"pointer"}}>InActive</span>}
                    
                </td>
                <td className="text-center">
                    <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick ={()=>this.onEdit(task.id)}
                    >Edit&nbsp;
                        <span className="fa fa-pencil mr-5"></span>
                    </button>
                    &nbsp; &nbsp;
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick ={()=>this.onDelete(task.id)}
                    >Delete&nbsp;
                        <span className="fa fa-trash mr-5"></span>
                    </button>
                </td>
            </tr>
        );
    }
}


export default TaskItem
