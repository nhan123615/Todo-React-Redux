import React, { Component } from "react";


class Demo15 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            txtName: '',
            txtPassword: '',
            txtDescription: '',
            sltGender: 0,
            rdLang: 'EN',
            chkbStatus: true,
        };

    }

    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = (target.type === 'checkbox') ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    onHandleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                            <div className="panel panel-primary">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Demo 15 form</h3>
                                </div>
                                <div className="panel-body">
                                    <form onSubmit={this.onHandleSubmit}>
                                        <div className="form-group">
                                            <label >Username: </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="txtName"
                                                onChange={this.onHandleChange}
                                                value={this.txtName}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label >Password: </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="txtPassword"
                                                onChange={this.onHandleChange}
                                                value={this.txtPassword}
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label >Description: </label>
                                            <textarea
                                                className="form-control"
                                                name="txtDescription"
                                                onChange={this.onHandleChange}
                                                rows="3" cols="20"
                                            >
                                                {this.txtDescription}
                                            </textarea>
                                        </div>

                                        <label >Gender: </label>
                                        <select
                                            name="sltGender"
                                            className="form-control"
                                            value={this.state.sltGender}
                                            onChange={this.onHandleChange}
                                        >
                                            <option value={0}>Female</option>
                                            <option value={1} >Male</option>
                                        </select>

                                        <div className="radio">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="rdLang"
                                                    value='EN'
                                                    onChange={this.onHandleChange}
                                                    checked={this.state.rdLang === 'EN'}
                                                />
                                                EN
                                            </label>&nbsp;&nbsp;&nbsp;&nbsp;
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="rdLang"
                                                    value='VI'
                                                    onChange={this.onHandleChange}
                                                    checked={this.state.rdLang === 'VI'}
                                                />
                                                VI
                                            </label>
                                        </div>
                                        <div class="checkbox">
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="chkbStatus"
                                                    value={true}
                                                    checked={this.state.chkbStatus === true}
                                                    onChange={this.onHandleChange}

                                                />
                                                Status
                                            </label>
                                        </div>
                                        <br />
                                        <button type="submit" className="btn btn-primary">Save</button> &nbsp;
                                        <button type="reset" className="btn btn-default">Clear</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Demo15
