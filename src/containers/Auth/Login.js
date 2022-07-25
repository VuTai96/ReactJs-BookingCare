import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false
        }
    }
    handleOnchangeUsename = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    handleOnchangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleShowHide = (e) => {

        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleLogin = () => {
        console.log(this.state)
    }
    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center header-login'>Login</div>
                        <div className='col-12 form-group'>
                            <label>Username:</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(e) => this.handleOnchangeUsename(e)}
                            />
                        </div>
                        <div className='col-12 form-group mt-3'>
                            <div className='custom-password'>
                                <label>Password:</label>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnchangePassword(e)}
                                />
                                <span onClick={(e) => this.handleShowHide(e)}>
                                    {this.state.isShowPassword ?
                                        <i class="far fa-eye-slash"></i>
                                        :
                                        <i class="fas fa-eye"></i>
                                    }
                                </span>
                            </div>
                        </div>
                        <div className='col-12 contain-btn'>
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()}
                            >
                                Login
                            </button>
                        </div>
                        <div className='col-12 forget-text'>
                            <span>Forgot your password?</span>
                        </div>
                        <div className='col-12 other-login-text'>
                            Or sign in with:
                        </div>
                        <div className='col-12 login-with'>
                            <i class="fab fa-google-plus google-icon"></i>
                            <i class="fab fa-facebook face-icon"></i>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
