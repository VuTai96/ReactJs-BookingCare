
import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './DoctorInforExtra.scss'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowPrice: false
        }
    }

    componentDidMount() {
        this.setState({

        })
    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {

        }
    }
    handleClickShowHide = (value) => {
        this.setState({
            isShowPrice: value
        })
    }
    render() {
        let { isShowPrice } = this.state
        let { language } = this.props
        return (
            <div className='doctor-inforExtra-container'>
                <div className='title-address-clinic'>
                    địa chỉ khám:
                </div>
                <div className='nameClinic'>
                    Phòng khám chuyên khoa gia liễu
                </div>
                <div className='address-clinic'>
                    207 Phố Huế- Hai Bà Trưng- Hà Nội
                </div>
                {isShowPrice ?
                    <div className='examination-price-show'>
                        <div className='title-examination-price'>
                            Giá khám:
                        </div>
                        <div className='table-price'>
                            <div className='line-price'>
                                <div> Giá khám:</div>
                                <div> 250.000đ</div>
                            </div>
                            <div className='line-note'>
                                được ưu tiên khi đặt lịch khám qua bookingcare.com, giá khám cho người nước ngoài là 30 USD
                            </div>
                            <div className='line-payment'>
                                Người bệnh có thể thanh toán chi chi phí bằng hình thức tiền mặt và quẹt thẻ
                            </div>
                        </div>
                        <div className='btn-showhide'>
                            <span onClick={() => this.handleClickShowHide(false)}>
                                Ẩn bảng giá
                            </span>
                        </div>
                    </div>
                    :
                    <div className='examination-price-hide'>
                        <span className='title-examination-price'>
                            Giá khám:
                        </span>
                        <span className='price'>
                            250.000đ
                        </span>
                        <span className='btn-showhide'
                            onClick={() => this.handleClickShowHide(true)}>
                            Xem chi tiết
                        </span>
                    </div>
                }
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
