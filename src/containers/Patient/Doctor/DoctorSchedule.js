
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss'
import { getScheduleDoctorByDate } from '../../../services/userService'
import { withRouter } from 'react-router-dom'


class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            dateSelected: moment().startOf('day').valueOf()
        }
    }
    setAllDay = (lang) => {
        moment.updateLocale('vi', {
            weekdays: [
                "Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"
            ]
        });
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (lang === LANGUAGES.VI) {
                obj.label = moment().add(i, 'days').locale('vi').format('dddd - DD/MM')
            }
            if (lang === LANGUAGES.EN) {
                obj.label = moment().add(i, 'days').locale('en').format('dddd - DD/MM')
            }
            obj.value = moment().add(i, 'days').startOf('day').valueOf()
            arrDate.push(obj)
        }
        return arrDate
    }
    async componentDidMount() {
        this.setState({
            allDays: this.setAllDay(this.props.language)
        })
        let response = await getScheduleDoctorByDate(this.props.match.params.id, this.state.dateSelected)
        console.log('response', response)

    }
    componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                allDays: this.setAllDay(this.props.language)
            })
        }
    }
    handleOnchange = async (e) => {

        this.setState({
            dateSelected: e.target.value
        })
        let response = await getScheduleDoctorByDate(this.props.match.params.id, e.target.value)
        console.log('response1', response)
    }

    render() {
        let { allDays, dateSelected } = this.state
        return (
            <div className='doctor-schedule-container'>
                <div className='select-date'>
                    <select className="form-select" aria-label="Default select example"
                        onChange={(e) => this.handleOnchange(e)}
                    // value={dateSelected}
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
                <div className='show-choosed-date'></div>
            </div>
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
