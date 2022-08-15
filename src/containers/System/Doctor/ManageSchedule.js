import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

import './ManageSchedule.scss'
import Select from 'react-select';
import { LANGUAGES, dateFormat } from '../../../utils/constant'
import { getDetailDoctor, updateDetailDoctor, saveBulkCreateSchedule } from '../../../services/userService'
import { toast } from 'react-toastify';
import Header from '../../../containers/Header/Header'
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';

class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: {},
            optionDoctors: [],
            currentDate: '',
            rangeTime: []
        }
    }
    async componentDidMount() {
        await this.props.fetchAllDoctors()
        await this.props.fetchScheduleTime('TIME')
    }
    setOptionDoctor = (doctors) => {
        let option = [];
        doctors.map((item, index) => {
            let obj = {}
            if (this.props.language === LANGUAGES.VI) {
                obj.label = `${item.lastName} ${item.firstName}`
                obj.value = item.id
            }
            if (this.props.language === LANGUAGES.EN) {
                obj.label = `${item.firstName} ${item.lastName}`
                obj.value = item.id
            }
            option.push(obj)
        })
        return option
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let option = this.setOptionDoctor(this.props.doctors)
            this.setState({
                optionDoctors: option
            })
        }
        if (prevProps.language !== this.props.language) {
            let option = this.setOptionDoctor(this.props.doctors)
            let a = option.filter(item => item.value === this.state.selectedDoctor.value)
            this.setState({
                optionDoctors: option,
                selectedDoctor: a[0] || ''
            })
        }
        if (prevProps.rangeTimeRedux !== this.props.rangeTimeRedux) {
            let data = this.props.rangeTimeRedux.map(item => ({ ...item, isSelected: false }))
            this.setState({
                rangeTime: data
            })
        }
    }
    handleChange = async (selectedDoctor) => {
        let response = await getDetailDoctor(selectedDoctor.value)
        this.setState({
            selectedDoctor
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) => {
        let data = this.state.rangeTime.map((item => {
            if (item.id === time.id) {
                item.isSelected = !item.isSelected
            }
            return item
        }))
        this.setState({
            rangeTime: data
        })
    }
    handleClickBtnSave = async () => {
        let { selectedDoctor, currentDate, rangeTime } = this.state
        let result = []
        if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
            toast.error('Invalid doctor!')
            return
        }
        if (!currentDate) {
            toast.error('Invalid date!')
            return
        }
        // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formatDate = moment(currentDate).unix()
        let formatDate = (new Date(currentDate)).getTime()

        let selectedTime = rangeTime.filter(item => item.isSelected === true)
        if (!selectedTime || _.isEmpty(selectedTime)) {
            toast.error('Invalid selected time!')
            return
        }
        selectedTime.map(item => {
            let obj = {}
            obj.doctorId = selectedDoctor.value
            obj.date = formatDate
            obj.timeType = item.keyMap
            result.push(obj)
        })
        let res = await saveBulkCreateSchedule({ schedule: result })
        if (res.errCode === 0) {
            toast.success(res.message)
        } else {
            toast.error(res.message)
        }
    }
    render() {
        let { selectedDoctor, optionDoctors, currentDate, rangeTime } = this.state
        let { language } = this.props
        let date = new Date();
        date.setDate(date.getDate() - 1);
        return (
            <>
                <div className='container'>
                    <div className='title'>
                        <FormattedMessage id="doctor.manage-schedule" />
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <div><FormattedMessage id="doctor.choose-doctor" /></div>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChange}
                                options={optionDoctors}
                            />
                        </div>
                        <div className='col-6'>
                            <div> <FormattedMessage id="doctor.choose-date" /></div>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                minDate={date}
                                value={this.state.currentDate}
                            />
                        </div>
                    </div>
                    <div className='btn-range-time'>
                        {rangeTime.map((item, index) => {
                            return (
                                <button className={
                                    item.isSelected ? 'btn btn-outline-secondary active' : 'btn btn-outline-secondary'
                                }
                                    key={index}
                                    onClick={() => this.handleClickBtnTime(item)}
                                >
                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                </button>
                            )
                        })

                        }
                    </div>
                    <div className='col-12 mt-5'>
                        <button className='btn btn-primary'
                            onClick={() => this.handleClickBtnSave()}
                        >
                            <FormattedMessage id="doctor.save-schedule" />
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        doctors: state.admin.allDoctors,
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        rangeTimeRedux: state.admin.rangeTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        createDetailDoctor: (detailDoctor) => dispatch(actions.saveDetailDoctor(detailDoctor)),
        fetchScheduleTime: (type) => dispatch(actions.fetchScheduleTime(type))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
