import React from 'react';

import axios from 'axios';
import {Link} from "react-router-dom";

class Authorization extends React.Component {

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
    }

    componentDidMount() {
        // Get all groups from API
        axios.get(`${window.API_URL}/groups/`)
            .then(res => {
                const groups = res.data.data.result;
                this.setState({groups});
            });
    }

    auth = (e) => {
        e.preventDefault();
        window.$.ajax({
            url: `${window.DOMAIN_NAME}/auth/jwt/create/`,
            type: "POST",
            data: {
                'username': this.username.value,
                'password': this.password.value,
            }
        }).done(function(res) {
            var token = res.data.token;
            window.localStorage.setItem('token', "JWT "+ token);
            window.location.reload()
        }).catch(err=>{
            console.log(err);
        })


    };


    render() {
        return (
            <>
                <div className="row">
                    <div className="col s6 offset-s3">
                        <div className="card-panel">
                            <div className="row">
                                <form className="col s12">
                                    <h4 className="header2 center-align">Авторизація</h4>
                                    <div className='divider'></div>
                                    <div className="row">
                                        <div className="input-field col s8 offset-s2">
                                            <i className="mdi-action-account-circle prefix"></i>
                                            <input ref={(username) => {
                                                this.username = username
                                            }} id="icon_prefix" type="text"
                                                   className="validate"/>
                                            <label htmlFor="icon_prefix">Логін</label>
                                        </div>
                                        <div className="input-field col s8 offset-s2">
                                            <i className="mdi-action-lock-outline prefix"></i>
                                            <input ref={(password) => {
                                                this.password = password
                                            }} id="icon_password" type="password" className="validate"/>
                                            <label htmlFor="icon_password">Пароль</label>
                                        </div>
                                        <div className="input-field col s9 offset-s2">
                                            <div className="input-field col s12 ">
                                                <button onClick={this.auth}
                                                        className="col s12 btn cyan waves-effect waves-light"
                                                        type="submit"
                                                        name="action"><i className="mdi-action-lock-open"></i> Авторизація
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Authorization;