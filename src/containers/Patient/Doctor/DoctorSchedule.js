
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss'
import { getScheduleDoctorByDate } from '../../../services/userService'
import { withRouter } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';




class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            dateSelected: moment().startOf('day').valueOf(),
            arrScheduleOfDay: [],
            isShowBookingModal: false,
            timeScheduledetail: {}
        }
    }
    setAllDay = (lang) => {
        moment.updateLocale('vi', {
            weekdays: [
                "Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"
            ]
        });
        moment.updateLocale('homnay', {
            weekdays: [
                "Hôm nay", "Hôm nay", "Hôm nay", "Hôm nay", "Hôm nay", "Hôm nay", "Hôm nay"
            ]
        });
        moment.updateLocale('today', {
            weekdays: [
                "Today", "Today", "Today", "Today", "Today", "Today", "Today"
            ]
        });
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (lang === LANGUAGES.VI) {
                if (i === 0) {
                    obj.label = moment().add(i, 'days').locale('homnay').format('dddd - DD/MM')
                } else {
                    obj.label = moment().add(i, 'days').locale('vi').format('dddd - DD/MM')
                }
            }
            if (lang === LANGUAGES.EN) {
                if (i === 0) {
                    obj.label = moment().add(i, 'days').locale('today').format('dddd - DD/MM')
                } else {
                    obj.label = moment().add(i, 'days').locale('en').format('dddd - DD/MM')
                }
            }
            obj.value = moment().add(i, 'days').startOf('day').valueOf()
            arrDate.push(obj)
        }
        return arrDate
    }
    componentDidMount() {
        this.setState({
            allDays: this.setAllDay(this.props.language)
        })
    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                allDays: this.setAllDay(this.props.language)
            })
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let response = await getScheduleDoctorByDate(this.props.doctorId, this.state.dateSelected)
            if (response.errCode === 0 && response?.data?.length > 0) {
                this.setState({
                    arrScheduleOfDay: response.data || []
                })
            }
        }
    }
    handleOnchange = async (e) => {
        this.setState({
            dateSelected: e.target.value
        })
        let response = await getScheduleDoctorByDate(this.props.match.params.id, e.target.value)
        if (response.errCode === 0) {
            this.setState({
                arrScheduleOfDay: response?.data || []
            })
        }
    }
    handleClickTime = (time) => {
        this.setState({
            isShowBookingModal: true,
            timeScheduledetail: time
        })
    }
    closeModal = () => {
        this.setState({
            isShowBookingModal: false
        })
    }
    render() {
        let { allDays, dateSelected, arrScheduleOfDay,
            isShowBookingModal } = this.state
        let { language } = this.props
        // toggle={''}
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='select-date'>
                        <select className="form-select" aria-label="Default select example"
                            onChange={(e) => this.handleOnchange(e)}
                        >
                            {allDays.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='schedule-title'>
                        <i className="fas fa-calendar-alt"> <span>
                            <FormattedMessage id="patient.detail-doctor" />
                        </span></i>
                    </div>
                    <div className='show-choosed-date'>

                        {arrScheduleOfDay.length > 0 ?
                            <>
                                {arrScheduleOfDay.map((item, index) => {
                                    return (
                                        <button className='btn btn-warning timeType-btn' key={index}
                                            onClick={() => this.handleClickTime(item)}
                                        >
                                            {language === LANGUAGES.VI && item.timeTypeData.valueVi}
                                            {language === LANGUAGES.EN && item.timeTypeData.valueEn}
                                        </button>
                                    )
                                })
                                }
                                <div className='note'>
                                    <FormattedMessage id='patient.choose' />
                                    <i className="fas fa-hand-point-up"></i>
                                    <FormattedMessage id='patient.book-free' />

                                </div>
                            </>
                            :
                            <div className='timeType-none'>
                                <FormattedMessage id='patient.none-schedule' />
                            </div>
                        }
                    </div>
                </div>
                <BookingModal
                    isShowBookingModal={this.state.isShowBookingModal}
                    closeModal={this.closeModal}
                    timeScheduledetail={this.state.timeScheduledetail}
                />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));
