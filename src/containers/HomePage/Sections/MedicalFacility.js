import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from './PreNextArrow'
import './Sections.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';


class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrMedical: []
        }
    }
    async componentDidMount() {
        let response = await getAllClinic()
        if (response?.errCode === 0) {
            this.setState({
                arrMedical: response?.data || []
            })
        } else {
            console.log('getAllClinic', response.errMessage)
        }
    }
    handleOnclickClinic = async (clinic) => {
        this.props.history.push(`/detail-clinic/${clinic.id}`)
    }

    render() {

        let settings = {
            dots: false,
            infinite: false,
            speed: 250,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        let { arrMedical } = this.state
        console.log(arrMedical)
        return (
            <div className='homepage-section second'>
                <div className='section-content'>
                    <div className='section-header'>
                        <h2><FormattedMessage id="doctor.medical-facility" /></h2>
                        <button><FormattedMessage id="doctor.more-detail" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {arrMedical.map((item, index) => {
                                return (
                                    <div className='image-section2' key={index}
                                        onClick={() => this.handleOnclickClinic(item)}
                                    >
                                        <div className='div-image'
                                            style={{
                                                backgroundImage: `url("${item.image}")`,
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        > </div>
                                        <h5>{item.name}</h5>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
