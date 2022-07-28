import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';



class Home extends Component {

    render() {


        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i class="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Chuyên khoa</b></div>
                                <div className='sub-title'>
                                    Tìm bác sĩ theo chuyên khoa
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ sở y tế</b></div>
                                <div className='sub-title'>
                                    Chọn bện viện phòng khám
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác sĩ</b></div>
                                <div className='sub-title'>
                                    Chọn bác sỹ giỏi
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói khám</b></div>
                                <div className='sub-title'>
                                    Khám sức khỏe tổng quát
                                </div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i class="fas fa-question-circle"></i>
                                Support
                            </div>
                            <div className='vietnam active'>VN</div>
                            <div className='english'>EN</div>

                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='top-banner'>
                        <div className='text-title-top'>
                            NỀN TẢNG Y TẾ
                        </div>
                        <div className='text-title-bottom'>
                            CHĂM SÓC SỨC KHỎE TOÀN DIỆN
                        </div>
                        <div className='search'>
                            <i class="fas fa-search"></i>
                            <input placeholder='Tìm phòng khám' />
                        </div>
                    </div>
                    <div className='bottom-banner'>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>Khám chuyên khoa</div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-mobile-alt"></i>
                            <div>Khám<br /> từ xa</div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-box"></i>
                            <div>Khám tổng quát</div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>Xét nghiệm y học</div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>Sức khỏe tinh thần</div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>Khám nha khoa</div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>Gói phẫu thuật</div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>Sản phẩm y tế</div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.user.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
