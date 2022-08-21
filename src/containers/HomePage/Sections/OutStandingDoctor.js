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
import { withRouter } from 'react-router';
import LoadingScreen from 'react-loading-screen';
import ReactLoading from 'react-loading';

const Example = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={40} width={40} />
);


class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
            isLoading: false
        }
    }

    async componentDidMount() {
        this.setState({
            isLoading: true
        })
        await this.props.fetchTopDoctorRedux()
        this.setState({
            isLoading: false
        })
    }
    componentDidUpdate(preProps, PreState, snapshot) {
        if (preProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }
    handleOnclickDoctor = async (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        let { arrDoctors, isLoading } = this.state
        let { language } = this.props
        let settings = {
            className: "slider variable-width",
            dots: false,
            infinite: false,
            speed: 250,
            slidesToShow: arrDoctors.length >= 4 ? 4 : 1,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <div className='homepage-section first'>
                <div className='section-content'>
                    <div className='section-header'>
                        <h2><FormattedMessage id="homepage.top-doctor" /></h2>
                        <button><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    {isLoading === false ?
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
                                        <div className='image-section3' key={index}
                                            onClick={() => this.handleOnclickDoctor(item)}
                                        >
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
                        :
                        <Example
                            type={'spinningBubbles'}
                            color={"rgba(0,0,0,0.6"}
                            className='loading-center'
                        />
                    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
