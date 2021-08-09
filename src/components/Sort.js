import React, { Component } from "react";


class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort:{
                by:'name',
                value: 1
            },

        }
    }

    onClick =(sortBy,sortValue)=>{
        this.setState({
            sort:{
                by:sortBy,
                value:sortValue
            }
        },()=>{
            this.props.onSort(this.state.sort);
        })
     

      
    }

    render() {
        var {sort} = this.state;
        return (
<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
    <div className="dropdown">
        <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown">
            Arrange&nbsp;&nbsp;
            <span className="fa fa-caret-square-o-down mr-5"></span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li onClick={()=>this.onClick('name',1)}>
                <a   href="#/" onClick={(e) => e.preventDefault()}
                    className={(sort.by==='name'&&sort.value===1)?'dropdown-item  sort_selected':'dropdown-item '}
                    >
                    <span className="fa fa-sort-alpha-asc pr-5 "></span>&nbsp;&nbsp;
                    Name A-Z
                </a>
            </li>

            <li onClick={()=>this.onClick('name',-1)}>
                <a href="#/"  onClick={(e) => e.preventDefault()}
                    className={(sort.by==='name'&&sort.value===-1)?'dropdown-item  sort_selected':'dropdown-item '}
                    >
                    <span className="fa fa-sort-alpha-desc pr-5"></span>&nbsp;&nbsp;
                    Name Z-A</a>
            </li>

            <li><hr className="dropdown-divider" /></li>
            <li onClick={()=>this.onClick('status',1)}>
                <a href="#/"  onClick={(e) => e.preventDefault()}
                    className={(sort.by==='status'&&sort.value===1)?'dropdown-item  sort_selected':'dropdown-item '}
                    >
                    Active</a>
            </li>
            <li onClick={()=>this.onClick('status',-1)}>
                <a href="#/" onClick={(e) => e.preventDefault()}
                    className={(sort.by==='status'&&sort.value===-1)?'dropdown-item  sort_selected':'dropdown-item '}
                    >
                    InActive</a>
            </li>
        </ul>
    </div>
</div>
        );
    }
}


export default Sort
