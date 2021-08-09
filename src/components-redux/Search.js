import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "./../redux/actions/Index";


class Search extends Component {

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.props.onSearch(
            (name === 'keyword') ? value : ''
        )
    }

    onClear = () => {
        this.props.onSearch('');
    }

    render() {
        var { keyword } = this.props

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="clearable"
                >
                    <input
                        type="text"
                        name="keyword"
                        className="form-control"
                        placeholder="Input your keyword..."
                        value={keyword}
                        onChange={this.onChange}

                    />
                    {(keyword)
                        ? <i className="clearable__clear" onClick={this.onClear}>
                            <span className="fa fa-times"></span>
                        </i>
                        : ''}

                </div>
            </div>
        );
    }
}

const mapStateToProp = (state) => {
    return {
        keyword: state.keyword
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword))
        },

    }
}

export default connect(mapStateToProp, mapDispatchToProps)(Search)