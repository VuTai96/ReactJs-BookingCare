import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from './PreNextArrow'
import './Sections.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import CommonUtils from '../../../utils/CommonUtils'

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }

    async componentDidMount() {
        await this.props.fetchTopDoctorRedux('')
    }
    componentDidUpdate(preProps, PreState, snapshot) {
        if (preProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }
    render() {
        let { arrDoctors } = this.state
        let { language } = this.props
        let settings = {
            className: "slider variable-width",
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: arrDoctors.length >= 4 ? 4 : 1,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div className='homepage-section first'>
                <div className='section-content'>
                    <div className='section-header'>
                        <h2>Bác sĩ nổi bật tuần qua</h2>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {arrDoctors.map((item, index) => {
                                let urlImage = ''

                                if (item.image) {
                                    urlImage = CommonUtils.Base64ToImage(item.image)
                                }

                                let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}  ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className='image-section3' key={index} >
                                        {/* style={{ backgroundImage: `url(${urlImage})` }} */}


                                        <div className='div-image'
                                            style={{
                                                backgroundImage: `url("${urlImage}")`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                            }}></div>
                                        <h5>{language === LANGUAGES.VI ? nameVi : nameEn}</h5>
                                        <p>Đa khoa</p>

                                    </div>
                                )
                            })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorRedux: state.admin.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctorRedux: (limit) => dispatch(actions.fetchTopDoctor(limit))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
