import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from './PreNextArrow'
import './Sections.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className='nextstyle'
//             // style={{ ...style, display: "block", background: "red" }}
//             onClick={onClick}
//         >
//             <i class="fas fa-chevron-right"></i>
//         </div>
//     );
// }

// function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className='prestyle'
//             // style={{
//             //     ...style, display: "inline-block", background: "green"
//             // }}
//             onClick={onClick}
//         >
//             <i class="fas fa-chevron-left"></i>
//         </div>
//     );
// }
class Specailty extends Component {
    render() {

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
                        <h2>Chuyên khoa phổ biến</h2>
                        <button>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='image-section'>
                                <div className='div-image'>                                </div>
                                <h5>Khám thần kinh</h5>
                            </div>
                            <div className='image-section'>
                                <div className='div-image'>                                </div>
                                <h5>Khám thần kinh</h5>
                            </div>
                            <div className='image-section'>
                                <div className='div-image'>                                </div>
                                <h5>Khám thần kinh</h5>
                            </div>
                            <div className='image-section'>
                                <div className='div-image'>                                </div>
                                <h5>Khám thần kinh</h5>
                            </div>
                            <div className='image-section'>
                                <div className='div-image'>                                </div>
                                <h5>Khám thần kinh</h5>
                            </div>
                            <div className='image-section'>
                                <div className='div-image'>                                </div>
                                <h5>Khám thần kinh</h5>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specailty);
