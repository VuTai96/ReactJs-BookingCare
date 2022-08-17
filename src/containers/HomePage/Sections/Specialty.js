import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from './PreNextArrow'
import './Sections.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';



class Specailty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let response = await getAllSpecialty()
        if (response.errCode === 0) {
            this.setState({
                dataSpecialty: response.data || []
            })
        } else {
            toast.error(response.errMessage)
        }
    }

    handleOnclickSpecialty = async (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`)
    }

    render() {
        console.log(this.state.dataSpecialty)
        let settings = {
            dots: false,
            infinite: true,
            speed: 250,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };


        return (
            <div className='homepage-section first'>
                <div className='section-content'>
                    <div className='section-header'>
                        <h2><FormattedMessage id="homepage.popular-specialty" /></h2>
                        <button><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {this.state.dataSpecialty.map((item, index) => {
                                return (
                                    <div className='image-section'
                                        onClick={() => this.handleOnclickSpecialty(item)}
                                    >
                                        <div
                                            key={index}
                                            className='div-image'
                                            style={{
                                                backgroundImage: `url("${item.image}")`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        ></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specailty));
