
import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { withRouter } from 'react-router';
import { postVerifyBookAppointment } from '../../services/userService';
import { toast } from 'react-toastify';
import HomeHeader from '../HomePage/HomeHeader';

class VerifyEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            statusVerify: false,
            errCode: ''
        }
    }

    async componentDidMount() {
        if (this.props.history?.location?.search) {
            let params = new URLSearchParams(this.props.history.location.search);
            let doctorId = params.get('doctorId')
            let token = params.get('token')
            let response = await postVerifyBookAppointment({ doctorId, token })
            if (response) {
                if (response?.errCode === 0) {
                    toast.success(response?.errMessage)
                    this.setState({
                        statusVerify: true,
                        errCode: 0,
                        statusVerify: false
                    })
                } else {
                    toast.error(response?.errMessage)
                    this.setState({
                        statusVerify: false,
                        errCode: 2,
                        statusVerify: false
                    })
                }
            } else {
                this.setState({
                    statusVerify: false
                })
            }
        }
    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }

    render() {

        return (
            <>
                <HomeHeader />
                {
                    this.state.statusVerify ?
                        <div className='title'>Is loading...</div>
                        :
                        <>
                            {
                                this.state.errCode === 0 ?
                                    <div className='title'>Xác nhận lịch hẹn thành công!</div>
                                    :
                                    <div className='title'>Lịch hẹn không tồn tại hoặc đã được xác nhận!</div>

                            }
                        </>
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        topDoctorRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VerifyEmail));
