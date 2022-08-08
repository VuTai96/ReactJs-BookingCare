import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'

import './ManageSchedule.scss'
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/constant'
import { getDetailDoctor, updateDetailDoctor } from '../../../services/userService'
import { toast } from 'react-toastify';
import Header from '../../../containers/Header/Header'
import DatePicker from '../../../components/Input/DatePicker';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];


class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedDoctor: '',
            optionDoctors: [],
            currentDate: new Date(),
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
            this.setState({
                rangeTime: this.props.rangeTimeRedux
            })
        }
    }
    handleChange = async (selectedDoctor) => {
        let response = await getDetailDoctor(selectedDoctor.value)
        console.log('getDetailDoctor', response)
        this.setState({
            selectedDoctor
        })
    }
    handleOnChangeDatePicker = (date) => {
        console.log(date)
        this.setState({
            currentDate: date[0]
        })
    }
    render() {
        let { selectedDoctor, optionDoctors, currentDate, rangeTime } = this.state
        console.log(rangeTime)
        let { language } = this.props
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
                                minDate={new Date()}
                                value={this.state.currentDate}
                            />
                        </div>
                    </div>
                    <div className='btn-range-time'>
                        {rangeTime.map((item, index) => {
                            return (
                                <button className='btn btn-outline-secondary' >
                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                </button>
                            )
                        })

                        }
                    </div>
                    <div className='col-12 mt-5'>
                        <button className='btn btn-primary' >
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
