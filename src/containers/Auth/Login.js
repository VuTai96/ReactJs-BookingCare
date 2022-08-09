import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services';
import { reduce } from 'lodash';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
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
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLogin(this.state.username, this.state.password)
            //console.log('data in login', data)
            if (data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            this.setState({
                errMessage: error.response?.data?.message
            })
        }

        //console.log(this.state)
    }
    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin()
        }
    }
    render() {

        return (
            <div className='login-background'
                onKeyDown={(event) => this.handleKeyPress(event)}>
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
                                        <i className="far fa-eye-slash"></i>
                                        :
                                        <i className="fas fa-eye"></i>
                                    }
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
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
                            <i className="fab fa-google-plus google-icon"></i>
                            <i className="fab fa-facebook face-icon"></i>

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
        // adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        //userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
