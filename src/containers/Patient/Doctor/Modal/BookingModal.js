
import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss'
import { LANGUAGES } from '../../../../utils/constant'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';

class BookingModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeScheduledetail: {}
        }
    }
    async componentDidMount() {
        this.setState({
            timeScheduledetail: this.props.timeScheduledetail || {}
        })

    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
        if (prevProps.timeScheduledetail !== this.props.timeScheduledetail) {
            this.setState({
                timeScheduledetail: this.props.timeScheduledetail
            })
        }
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
                                Thông tin đặt lịch khám bệnh
                            </div>
                            <div className='right'>
                                <i class="fas fa-times"
                                    onClick={() => closeModal()}
                                ></i>
                            </div>
                        </div>
                        <div className='body' >
                            <div className='profile-doctor'>
                                <ProfileDoctor
                                    timeScheduledetail={timeScheduledetail}
                                />
                            </div>
                            <form>
                                <div className='row'>
                                    <div className=" col-6 form-group">
                                        <label>Họ tên</label>
                                        <input className="form-control" placeholder="" />
                                    </div>
                                    <div className=" col-6 form-group">
                                        <label>Số điện thoại</label>
                                        <input class="form-control" placeholder="" />
                                    </div>
                                    <div className=" col-6 form-group">
                                        <label>Địa chỉ email</label>
                                        <input className="form-control" placeholder="" />
                                    </div>
                                    <div className=" col-6 form-group">
                                        <label>Địa chỉ liên hệ</label>
                                        <input class="form-control" placeholder="" />
                                    </div>

                                    <div className=" col-12 form-group">
                                        <label>Lý do khám</label>
                                        <input className="form-control" placeholder="" />
                                    </div>
                                    <div className=" col-6 form-group">
                                        <label>Đặt cho ai</label>
                                        <input class="form-control" placeholder="" />
                                    </div>
                                    <div className=" col-6 form-group">
                                        <label>Giới tính</label>
                                        <input className="form-control" placeholder="" />
                                    </div>
                                </div>
                            </form>


                        </div>
                        <div className='footer'>
                            <button className='btn btn-warning'>Xác nhận</button>
                            <button className='btn btn-secondary'
                                onClick={() => closeModal()}
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
        topDoctorRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
