import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailDoctor } from '../../../services/userService';
import './DetailDoctor.scss'
import { LANGUAGES } from '../../../utils/constant'

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctorDetail: {}
        }
    }
    async componentDidMount() {
        let doctorId = this.props?.match?.params?.id || ''
        if (doctorId) {
            let response = await getDetailDoctor(doctorId)
            if (response.errCode === 0) {
                this.setState({
                    doctorDetail: response?.data || {}
                })
            }
        }

    }
    render() {
        let { doctorDetail } = this.state
        let name = (this.props.language === LANGUAGES.VI) ?
            (doctorDetail?.positionData?.valueVi || '') + ' - ' + (doctorDetail?.lastName || '') + ' ' + (doctorDetail?.firstName || '')
            :
            (doctorDetail?.positionData?.valueEn || '') + ' - ' + (doctorDetail?.firstName || '') + ' ' + (doctorDetail?.lastName || '')
        return (
            <>
                <HomeHeader
                    showBaner={false}
                />
                <div className="detailDoctor-container">
                    <div className='container'>
                        <div className='doctor-detail'>
                            <div className='doctor-avata'
                                style={{
                                    backgroundImage: `url("${doctorDetail.image}")`,
                                    backgroundPosition: 'center center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                            </div>
                            <div className='doctor-descrition'>
                                <div className='doctor-descrition-header'>
                                    {name || ''}
                                </div>
                                <div className='doctor-descrition-body'>
                                    {doctorDetail.Markdown?.description || ''}
                                </div>
                            </div>
                        </div>
                        <div className='doctor-third mt-3'>
                            <hr />
                            <span
                                dangerouslySetInnerHTML={{ __html: `${doctorDetail?.Markdown?.contentHTML || ''}` }}
                            >
                            </span>
                        </div>
                    </div>

                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailDoctor));
