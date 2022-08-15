
import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { LANGUAGES } from '../../../../utils/constant'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeScheduledetail: {},
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            doctorId: '',
            selectedGender: '',
        }
    }

    async componentDidMount() {
        await this.props.getGenders()
        this.setState({
            timeScheduledetail: this.props.timeScheduledetail || {},
            doctorId: this.props.timeScheduledetail?.doctorId || '',
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
        })

    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let genders = this.setGenders(this.props.genders)
            this.setState({
                genders: genders
            })
        }
        if (prevProps.timeScheduledetail !== this.props.timeScheduledetail) {
            this.setState({
                timeScheduledetail: this.props.timeScheduledetail,
                doctorId: this.props.timeScheduledetail?.doctorId || ''
            })
        }
        if (prevProps.genders !== this.props.genders) {
            let genders = this.setGenders(this.props.genders)
            this.setState({
                genders: genders
            })
        }
    }
    setGenders = (dataGender) => {
        let genders = []
        if (dataGender?.length > 0) {
            dataGender.map((item, index) => {
                let g = {}
                let { language } = this.props
                if (language === LANGUAGES.VI) {
                    g.label = item.valueVi
                }
                if (language === LANGUAGES.EN) {
                    g.label = item.valueEn
                }
                g.value = item.keyMap
                genders.push(g)
            })
        }
        return genders

    }
    handleOnchangeInput = (e, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = e.target.value
        this.setState({
            ...stateCopy
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedGender) => {
        this.setState({ selectedGender })
    };
    handleClickSave = async () => {
        let dateToSend = (new Date(this.state.birthday)).getTime()
        let data = {
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: dateToSend,
            doctorId: this.state.doctorId,
            selectedGender: this.state.selectedGender?.value,
            timeType: this.state.timeScheduledetail.timeType
        }
        let response = await postPatientBookAppointment(data)
        if (response?.errCode === 0) {
            toast.success(response?.errMessage)
            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                selectedGender: '',
            })
            this.props.closeModal()
        } else {
            toast.error(response?.errMessage)
        }
    }
    handleClickCancel = () => {
        this.setState({
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
        })
        this.props.closeModal()
    }
    render() {
        let { isShowBookingModal, closeModal } = this.props
        let { timeScheduledetail } = this.state
        return (

            <>
                <Modal isOpen={isShowBookingModal} className={''}
                    centered
                    size='lg'
                >
                    <div className='bookingModal-content'>
                        <div className='header'>
                            <div className='left'>
                                <FormattedMessage id="patient.booking-modal.title-booking-modal" />
                            </div>
                            <div className='right'>
                                <i className="fas fa-times"
                                    onClick={() => this.handleClickCancel()}
                                ></i>
                            </div>
                        </div>
                        <div className='body' >
                            <div className='profile-doctor'>
                                <ProfileDoctor
                                    timeScheduledetail={timeScheduledetail}
                                    isShowProfileDescription={false}
                                />
                            </div>
                            <form>
                                <div className='row'>
                                    <div className=" col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.full-name" /></label>
                                        <input className="form-control" placeholder=""
                                            value={this.state.fullName}
                                            onChange={(e) => this.handleOnchangeInput(e, 'fullName')}
                                        />
                                    </div>
                                    <div className=" col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.phone-number" /></label>
                                        <input className="form-control" placeholder=""
                                            value={this.state.phoneNumber}
                                            onChange={(e) => this.handleOnchangeInput(e, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className=" col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                        <input className="form-control" placeholder=""
                                            value={this.state.email}
                                            onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                        />
                                    </div>
                                    <div className=" col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                        <input className="form-control" placeholder=""
                                            value={this.state.address}
                                            onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                        />
                                    </div>

                                    <div className=" col-12 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                        <input className="form-control" placeholder=""
                                            value={this.state.reason}
                                            onChange={(e) => this.handleOnchangeInput(e, 'reason')}
                                        />
                                    </div>
                                    <div className=" col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.date-of-birth" /></label>

                                        <DatePicker
                                            onChange={this.handleOnChangeDatePicker}
                                            className="form-control"
                                            value={this.state.birthday}
                                        />
                                    </div>
                                    <div className=" col-6 form-group">
                                        <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.genders}
                                        />
                                    </div>
                                </div>
                            </form>


                        </div>
                        <div className='footer'>
                            <button className='btn btn-warning'
                                onClick={() => this.handleClickSave()}
                            >
                                Xác nhận</button>
                            <button className='btn btn-secondary'
                                onClick={() => this.handleClickCancel()}
                            >
                                Cancel
                            </button>

                        </div>
                    </div>

                </Modal>

            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        topDoctorRedux: state.admin.topDoctor,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
