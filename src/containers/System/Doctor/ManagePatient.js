import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss'
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor } from '../../../services/userService';


class ManagePatient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentDate: (new Date()).setHours(0, 0, 0, 0),
            dataPatient: []
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
            currentDate: chooseDate[0],
            dataPatient: res.data || []
        })
    }
    handleClickConfirm = (item) => {

    }
    handleClickRemery = (item) => {

    }
    render() {
        let { dataPatient } = this.state
        return (
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
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.timeTypeDataPatient.valueVi}</td>
                                            <td>{item.dataPatient.firstName}</td>
                                            <td>{item.dataPatient.address}</td>
                                            <td>{item.dataPatient.genderData.valueVi}</td>
                                            <td>
                                                <button type='button' className="btn btn-primary"
                                                    onClick={() => this.handleClickConfirm(item)}
                                                >
                                                    Xác nhận</button>
                                                <button type='button' className="btn btn-success ms-2"
                                                    onClick={() => this.handleClickRemery(item)}
                                                >
                                                    Gửi hóa đơn</button>
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
