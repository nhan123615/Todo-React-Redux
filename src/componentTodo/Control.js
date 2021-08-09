import React, { Component } from "react";
import Search from "./Search";
import Sort from "./Sort";


class Control extends Component {
    render() {
        const {onSearch,onSort} = this.props
        return (
                <div className="row" style={{ marginTop: 20 }}>
                    <Search 
                        onSearch = {onSearch}
                    />
                    <Sort 
                        onSort = {onSort}
                    />
                </div>
        );
    }
}


export default Control
