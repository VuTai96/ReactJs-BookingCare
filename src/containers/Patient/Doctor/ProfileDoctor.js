
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getProfileDoctorById } from '../../../services/userService';
import './ProfileDoctor.scss'
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
// import localization from 'moment/locale/vi'


class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeScheduledetail: {},
            profileDoctor: {},
            doctorId: ''
        }
    }
    getProfileDoctor = async (doctorId) => {
        let response = await getProfileDoctorById(doctorId)
        if (response.errCode === 0) {
            return response.data
        } else {
            return {}

        }
    }
    async componentDidMount() {
        let profileDoctor = await this.getProfileDoctor(this.props.doctorId)
        this.setState({
            timeScheduledetail: this.props.timeScheduledetail || {},
            profileDoctor: profileDoctor,
            doctorId: this.props.doctorId
        })

    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.timeScheduledetail !== this.props.timeScheduledetail) {
            let profileDoctor = await this.getProfileDoctor(this.props.doctorId)
            this.setState({
                timeScheduledetail: this.props.timeScheduledetail,
                profileDoctor: profileDoctor,
                doctorId: this.props.doctorId
            })
        }
    }
    renderScheduleTime = (timeType) => {
        moment.updateLocale('vi', {
            weekdays: [
                "Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"
            ]
        });
        if (!_.isEmpty(timeType)) {
            let { language } = this.props

            let date = language === LANGUAGES.VI ?
                timeType?.timeTypeData?.valueVi + ' - ' + moment.unix(timeType?.date / 1000).local('vi').format('dddd - DD/MM/YYYY')
                :
                timeType?.timeTypeData?.valueEn + ' - ' + moment.unix(timeType?.date / 1000).format('ddd - MM/DD/YYYY')

            return (
                <>
                    <div>
                        {date}
                    </div>
                    <div>
                        Miễn phí đặt lịch
                    </div>
                </>
            )
        }
    }
    render() {
        let { timeScheduledetail, profileDoctor } = this.state
        let { language, isShowProfileDescription } = this.props
        return (
            <div className='doctor-profile-container'>
                <div className='infor'>
                    <div className='doctor-avata1'
                        style={{
                            backgroundImage: `url("${profileDoctor.image}")`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                    ></div>
                    <div className='description'>
                        <div className='name-position'>

                            {language === LANGUAGES.VI && profileDoctor.positionData?.valueVi + ', ' + profileDoctor.lastName + ' ' + profileDoctor.firstName}
                            {language === LANGUAGES.EN && profileDoctor.positionData?.valueEn + ', ' + profileDoctor.firstName + ' ' + profileDoctor.lastName}

                        </div>
                        {isShowProfileDescription ?
                            <div>
                                {profileDoctor.Markdown?.description}
                            </div>
                            :
                            <>
                                {this.renderScheduleTime(timeScheduledetail)}
                            </>
                        }
                    </div>

                </div>
                <div className='price'>
                    <FormattedMessage id="admin.manage-doctor.examination-price" />
                    {language === LANGUAGES.VI &&
                        <NumberFormat
                            value={profileDoctor.Doctor_Infor?.priceTypeData?.valueVi}
                            //className="foo"
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'VND'}
                        />
                    }
                    {language === LANGUAGES.EN &&
                        <NumberFormat
                            value={profileDoctor.Doctor_Infor?.priceTypeData?.valueEn}
                            //className="foo"
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'$'}
                        />
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
