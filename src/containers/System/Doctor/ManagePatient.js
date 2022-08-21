import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor, postSendRemedy } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingScreen from 'react-loading-screen';

class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: (new Date()).setHours(0, 0, 0, 0),
            dataPatient: [],
            isShowRemedyModal: false,
            dataModal: {}
        }
    }
    async componentDidMount() {
        let { user } = this.props
        let doctorId = user?.id || ''
        let date = this.state.currentDate
        let res = await getListPatientForDoctor(doctorId, date)
        if (res.errCode === 0) {
            this.setState({
                dataPatient: res.data || []
            })
        }

    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }
    handleOnChangeDatePicker = async (chooseDate) => {

        let { user } = this.props
        let doctorId = user?.id || ''
        let date = chooseDate[0].setHours(0, 0, 0, 0)
        let res = await getListPatientForDoctor(doctorId, date)
        this.setState({
            currentDate: date,
            dataPatient: res.data || [],
            isLoading: false
        })
    }
    handleClickConfirm = (item) => {
        console.log(item)
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.dataPatient.email,
            timeType: item.timeType,
            language: this.props.language,
            patientName: item.dataPatient.firstName
        }
        this.setState({
            isShowRemedyModal: true,
            dataModal: data
        })
    }
    closeModal = () => {
        this.setState({
            isShowRemedyModal: false,
        })
    }
    sendRemedy = async (dataFromModal) => {
        this.setState({
            isLoading: true
        })
        let resSendRemedy = await postSendRemedy({
            ...this.state.dataModal,
            ...dataFromModal,
        })
        if (resSendRemedy.errCode === 0) {
            this.setState({
                isLoading: false
            })
            toast.success(resSendRemedy.errMessage)
            this.closeModal()
            let { user } = this.props
            let doctorId = user?.id || ''
            let date = this.state.currentDate
            let res = await getListPatientForDoctor(doctorId, date)
            if (res.errCode === 0) {
                this.setState({
                    dataPatient: res.data || []
                })
            }
        } else if (resSendRemedy.errCode === 1) {
            toast.error(resSendRemedy.errMessage)
        } else {
            toast.error('error from server')
        }

    }
    render() {
        let { dataPatient } = this.state
        let { language } = this.props
        return (
            <>

                <div className='manage-patient-container container'>
                    <div className='title'>
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                // minDate={date}
                                value={this.state.currentDate}
                            />
                        </div>
                    </div>
                    <div className='col-12 manage-patient-table'>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ và tên</th>
                                    <th>Địa chỉ</th>
                                    <th>Giới tính</th>
                                    <th>Action</th>
                                </tr>
                                {dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        let time = language === LANGUAGES.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn;
                                        let gender = language === LANGUAGES.VI ? item.dataPatient.genderData.valueVi : item.dataPatient.genderData.valueEn;

                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{time}</td>
                                                <td>{item.dataPatient.firstName}</td>
                                                <td>{item.dataPatient.address}</td>
                                                <td>{gender}</td>
                                                <td>
                                                    <button type='button' className="btn btn-primary"
                                                        onClick={() => this.handleClickConfirm(item)}
                                                    >
                                                        Xác nhận</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="6">No data</td>
                                    </tr>

                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <RemedyModal
                    isShowRemedyModal={this.state.isShowRemedyModal}
                    dataModal={this.state.dataModal}
                    closeModal={this.closeModal}
                    sendRemedy={this.sendRemedy}
                />
                <LoadingScreen
                    loading={this.state.isLoading}
                    bgColor='rgba(32, 33, 37, 0.8)'
                    spinnerColor='#9ee5f8'
                    textColor='white'
                    text='Loading'

                >
                </LoadingScreen>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
