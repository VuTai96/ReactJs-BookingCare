
import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DoctorInforExtra.scss'
import { getExtraInforDoctorById } from '../../../services/userService'
import _ from 'lodash';
import NumberFormat from 'react-number-format';


class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowPrice: false,
            doctorInfor: {}
        }
    }

    async componentDidMount() {
        let response = await getExtraInforDoctorById(this.props.doctorId)
        if (!_.isEmpty(response.data)) {
            this.setState({
                doctorInfor: response.data
            })
        }
    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let response = await getExtraInforDoctorById(this.props.doctorId)
            if (!_.isEmpty(response.data)) {
                this.setState({
                    doctorInfor: response.data
                })
            }
        }
        if (prevProps.language !== this.props.language) {

        }
    }
    handleClickShowHide = (value) => {
        this.setState({
            isShowPrice: value
        })
    }
    render() {
        let { isShowPrice, doctorInfor } = this.state
        let { language } = this.props
        return (
            <div className='doctor-inforExtra-container'>
                <div className='title-address-clinic'>
                    <FormattedMessage id="admin.manage-doctor.examination-address" />
                </div>
                <div className='nameClinic'>
                    {doctorInfor.nameClinic}
                </div>
                <div className='address-clinic'>
                    {doctorInfor.addressClinic}
                </div>
                {isShowPrice ?
                    <div className='examination-price-show'>
                        <div className='title-examination-price'>
                            <FormattedMessage id="admin.manage-doctor.examination-price" />
                        </div>
                        <div className='table-price'>
                            <div className='line-price'>
                                <div>
                                    <FormattedMessage id="admin.manage-doctor.examination-price" />
                                </div>
                                <div>
                                    {language === LANGUAGES.VI &&
                                        <NumberFormat
                                            value={doctorInfor.priceTypeData?.valueVi}
                                            //className="foo"
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    }
                                    {language === LANGUAGES.EN &&
                                        <NumberFormat
                                            value={doctorInfor.priceTypeData?.valueEn}
                                            //className="foo"
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                    }
                                </div>
                            </div>
                            <div className='line-note'>
                                {doctorInfor.note}
                            </div>
                            <div className='line-payment'>
                                <FormattedMessage id="admin.manage-doctor.payment-comment" />
                                {language === LANGUAGES.VI && doctorInfor.paymentTypeData?.valueVi}
                                {language === LANGUAGES.EN && doctorInfor.paymentTypeData?.valueEn}
                            </div>
                        </div>
                        <div className='btn-showhide'>
                            <span onClick={() => this.handleClickShowHide(false)}>
                                <FormattedMessage id="admin.manage-doctor.hide-details" />
                            </span>
                        </div>
                    </div>
                    :
                    <div className='examination-price-hide'>
                        <span className='title-examination-price'>
                            <FormattedMessage id="admin.manage-doctor.examination-price" />
                        </span>
                        <span className='price'>
                            {language === LANGUAGES.VI &&
                                <NumberFormat
                                    value={doctorInfor.priceTypeData?.valueVi}
                                    //className="foo"
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                            }
                            {language === LANGUAGES.EN &&
                                <NumberFormat
                                    value={doctorInfor.priceTypeData?.valueEn}
                                    //className="foo"
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                            }
                        </span>
                        <span className='btn-showhide'
                            onClick={() => this.handleClickShowHide(true)}>
                            <FormattedMessage id="admin.manage-doctor.see-details" />

                        </span>
                    </div>
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
