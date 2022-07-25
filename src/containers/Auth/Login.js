import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';



class Login extends Component {
    constructor(props) {
        super(props);
        this.btnLogin = React.createRef();
    }

    render() {

        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-center header-login'>Login</div>
                        <div className='col-12 form-group'>
                            <label>Username:</label>
                            <input type='text' className='form-control' placeholder='Enter your username' />
                        </div>
                        <div className='col-12 form-group mt-3'>
                            <label>Password:</label>
                            <input type='password' className='form-control' placeholder='Enter your password' />
                        </div>
                        <div className='col-12 contain-btn'>
                            <button className="btn-login">Login</button>
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
