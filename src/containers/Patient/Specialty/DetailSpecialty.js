import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInforExtra from '../Doctor/DoctorInforExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [132, 202, 203]
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }
    render() {
        let { arrDoctor } = this.state

        return (
            <>
                <HomeHeader />
                <div className='detail-specialty-container'>
                    <div className='detail-specialty-scription'>

                    </div>
                    {arrDoctor.map((item, index) => {
                        return (
                            <div className='detail-specialty-doctor' key={index}>
                                <div className='detail-specialty-content-left'>
                                    <ProfileDoctor
                                        // timeScheduledetail={timeScheduledetail}
                                        isShowProfileDescription={true}
                                        doctorId={item}
                                    />
                                </div>
                                <div className='detail-specialty-content-right'>
                                    <div className='detail-specialty-doctor-schedule'>
                                        <DoctorSchedule
                                            doctorId={item}
                                        />
                                    </div>
                                    <div className='detail-specialty-doctor-inforExtra'>
                                        <DoctorInforExtra
                                            doctorId={item}
                                        />
                                    </div>

                                </div>
                            </div>
                        )
                    })

                    }

                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
