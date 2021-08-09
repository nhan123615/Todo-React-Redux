import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../redux/actions/Index";

class Sort extends Component {

    onSort = (by, value) => {
        this.props.onSort({
            by: by,
            value: value
        })
    }
    
    render() {
        const { sort } = this.props
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
                        <li onClick={() => this.onSort('name', 1)}>
                            <a href="#/"
                                onClick={(e) => e.preventDefault()}
                                className={(sort.by === 'name' && sort.value === 1)
                                    ? "dropdown-item sort_selected"
                                    : "dropdown-item"}
                            >
                                <span className="fa fa-sort-alpha-asc pr-5"></span>&nbsp;&nbsp;
                                Name A-Z
                            </a>
                        </li>

                        <li onClick={() => this.onSort('name', -1)}>
                            <a
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className={(sort.by === 'name' && sort.value === -1)
                                    ? "dropdown-item sort_selected"
                                    : "dropdown-item"}
                            >
                                <span className="fa fa-sort-alpha-desc pr-5"></span>&nbsp;&nbsp;
                                Name Z-A</a>
                        </li>

                        <li><hr className="dropdown-divider" /></li>
                        <li onClick={() => this.onSort('status', 1)}>
                            <a
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className={(sort.by === 'status' && sort.value === 1)
                                    ? "dropdown-item sort_selected"
                                    : "dropdown-item"}
                            >
                                Active</a>
                        </li>
                        <li onClick={() => this.onSort('status', -1)}>
                            <a
                                href="#/"
                                onClick={(e) => e.preventDefault()}
                                className={(sort.by === 'status' && sort.value === -1)
                                    ? "dropdown-item sort_selected"
                                    : "dropdown-item"}
                            >
                                InActive</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}


const mapStateToProp = (state) => {
    return {
        sort:state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort))
        },
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(Sort)
