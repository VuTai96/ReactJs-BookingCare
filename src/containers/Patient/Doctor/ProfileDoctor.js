
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getProfileDoctorById } from '../../../services/userService';
import './ProfileDoctor.scss'
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { LANGUAGES } from '../../../utils';


class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeScheduledetail: {},
            profileDoctor: {}
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
        let profileDoctor = await this.getProfileDoctor(this.props.timeScheduledetail.doctorId)
        this.setState({
            timeScheduledetail: this.props.timeScheduledetail || {},
            profileDoctor: profileDoctor
        })

    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.timeScheduledetail !== this.props.timeScheduledetail) {
            let profileDoctor = await this.getProfileDoctor(this.props.timeScheduledetail.doctorId)
            this.setState({
                timeScheduledetail: this.props.timeScheduledetail,
                profileDoctor: profileDoctor
            })
        }
    }
    render() {
        let { timeScheduledetail, profileDoctor } = this.state
        let { language } = this.props

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
                        <div>
                            {profileDoctor.Markdown?.description}
                        </div>
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
