import React, { Component } from "react";


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',

        }
    }

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
        this.props.onSearch(
            (name === 'keyword') ? value : this.state.keyword
        )

    }

    onClear = (event)=>{
        this.setState({
            keyword:''
        },()=>this.onChange(event))
    }
    render() {
        var { keyword } = this.state
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

export default Search
