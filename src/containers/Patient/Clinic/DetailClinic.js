import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInforExtra from '../Doctor/DoctorInforExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetialClinicById, getAllCode } from '../../../services/userService';
import { withRouter } from 'react-router'
import { CommonUtils, LANGUAGES } from '../../../utils';


class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
            optionDoctor: [],
            descriptionHTML: '',
            nameClinic: '',
            addressClinic: ''
        }
    }
    async componentDidMount() {
        let optionDoctor = []
        let arrDoctor = []
        let descriptionHTML = '', nameClinic = '', addressClinic = ''
        let { language } = this.props


        let response = await getDetialClinicById(this.props.match.params.id)
        if (response.errCode === 0) {

            descriptionHTML = response.data.resClinic?.descriptionHTML || ''
            nameClinic = response.data.resClinic?.name || ''
            addressClinic = response.data.resClinic?.address || ''
            arrDoctor = response.data.resDoctorInfor || []
            arrDoctor.map((item) => {
                optionDoctor.push(item.doctorId)
            })
        }

        this.setState({
            arrDoctor: arrDoctor || [],
            optionDoctor,
            descriptionHTML,
            nameClinic,
            addressClinic
        })
    }
    async componentDidUpdate(prevProps, revState, snapshot) {

        if (prevProps.language !== this.props.language) {
        }
    }
    handleOnchangeSelected = async (e) => {

        let arrDoctor = []
        let optionDoctor = []
        let response = await getDetialClinicById(this.props.match.params.id)
        if (response.errCode === 0) {
            arrDoctor = response.data?.resDoctorInfor || []
            arrDoctor.map((item) => {
                optionDoctor.push(item.doctorId)
            })
        }
        this.setState({
            arrDoctor,
            optionDoctor
        })
    }
    render() {
        let { optionDoctor, descriptionHTML, nameClinic, addressClinic } = this.state

        return (
            <>
                <HomeHeader />
                <div className='detail-specialty-container'>

                    <div className='detail-specialty-scription'>
                        <div className='detail-specialty-name'>
                            {nameClinic}
                        </div>
                        <div className='detail-specialty-address'>
                            <i class="fas fa-map-marker-alt"></i>
                            {' ' + addressClinic}
                        </div>
                        <div className='detail-specialty-content'
                            dangerouslySetInnerHTML={{ __html: `${descriptionHTML || ''}` }}
                        >
                        </div>
                    </div>

                    {optionDoctor.map((item, index) => {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));
