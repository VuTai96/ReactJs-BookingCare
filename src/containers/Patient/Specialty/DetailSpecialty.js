import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorInforExtra from '../Doctor/DoctorInforExtra';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetialSpecialtyById, getAllCode } from '../../../services/userService';
import { withRouter } from 'react-router'
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
            optionDoctor: [],
            arrProvince: [],
            descriptionHTML: '',
            optionProvince: [],
            selectedProvince: ''
        }
    }
    async componentDidMount() {
        let optionProvince = []
        let arrDoctor = []
        let optionDoctor = []
        let descriptionHTML = ''
        let { language } = this.props

        let response = await getDetialSpecialtyById(this.props.match.params.id, 'ALL')
        if (response.errCode === 0) {
            descriptionHTML = response.data.resSpecialty?.descriptionHTML || ''
            arrDoctor = response.data?.resDoctorInfor || []
            arrDoctor.map((item) => {
                optionDoctor.push(item.doctorId)
            })
        }


        let arrProvince = await getAllCode('PROVINCE')
        if (arrProvince.errCode === 0) {
            arrProvince.data.map((item) => {
                language === LANGUAGES.VI ?
                    optionProvince.push({ value: item.keyMap, label: item.valueVi })
                    :
                    optionProvince.push({ value: item.keyMap, label: item.valueEn })
            })
        }

        this.setState({
            arrDoctor: arrDoctor || [],
            optionDoctor,
            arrProvince: arrProvince.data || [],
            optionProvince,
            descriptionHTML
        })
    }
    async componentDidUpdate(prevProps, revState, snapshot) {

        if (prevProps.language !== this.props.language) {
            let optionProvince = []
            this.state.arrProvince.map((item) => {
                this.props.language === LANGUAGES.VI ?
                    optionProvince.push({ value: item.keyMap, label: item.valueVi })
                    :
                    optionProvince.push({ value: item.keyMap, label: item.valueEn })
            })
            this.setState({
                optionProvince,

            })
        }
    }
    handleOnchangeSelected = async (e) => {
        this.setState({
            selectedProvince: e.target.value,
        })
        let arrDoctor = []
        let optionDoctor = []
        // let descriptionHTML = ''
        let response = await getDetialSpecialtyById(this.props.match.params.id, e.target.value)
        if (response.errCode === 0) {
            // descriptionHTML = response.data.resSpecialty?.descriptionHTML || ''
            arrDoctor = response.data?.resDoctorInfor || []
            arrDoctor.map((item) => {
                optionDoctor.push(item.doctorId)
            })
        }
        this.setState({
            // selectedProvince: e.target.value,
            arrDoctor,
            optionDoctor
        })
    }
    render() {
        let { optionDoctor, optionProvince, descriptionHTML, selectedProvince } = this.state
        return (
            <>
                <HomeHeader />
                <div className='detail-specialty-container'>
                    <div className='detail-specialty-scription'
                        dangerouslySetInnerHTML={{ __html: `${descriptionHTML || ''}` }}
                    >
                    </div>
                    <div className='detail-specialty-select'>
                        <select className='detail-specialty-select-province'
                            value={selectedProvince}
                            onChange={(e) => this.handleOnchangeSelected(e)}
                        >
                            <option value="ALL">Toan Quoc</option>
                            {optionProvince.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })}


                        </select>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
