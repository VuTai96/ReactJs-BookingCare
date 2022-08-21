
import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss'
import { toast } from 'react-toastify';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import _ from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from '../../../utils';


class RemedyModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            imageBase64: ''
        }
    }

    async componentDidMount() {
        this.setState({
            email: this.props.dataModal?.email || ''
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal?.email || ''
            })
        }
    }
    handleClickCancel = () => {
        this.props.closeModal()
    }
    handleOnchangeInput = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    handleUploadImage = async (e) => {
        let file = e.target.files[0]
        if (file) {
            let res = await CommonUtils.toBase64(file)
            this.setState({
                imageBase64: res
            })
            // e.target.value = null
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
        // this.props.closeModal()
    }
    render() {
        let { isShowRemedyModal, closeModal, dataModal } = this.props
        return (
            <>
                <Modal
                    isOpen={isShowRemedyModal}
                    toggle={closeModal}
                    className={this.props.className}
                    centered
                >
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label className='form-label'>Email</label>
                                <input className='form-control' type='email' value={this.state.email}
                                    onChange={(e) => this.handleOnchangeInput(e)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label className='form-label'>Chọn file thuốc</label>
                                <input className='form-control' type='file'
                                    onChange={(e) => this.handleUploadImage(e)}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSendRemedy()}>Send</Button>{' '}
                        <Button color="secondary" onClick={closeModal}>Cancel</Button>
                    </ModalFooter>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
