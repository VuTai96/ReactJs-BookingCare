import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl'



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
                                <div><b><FormattedMessage id="homeheader.specialty" /></b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.finddoctorspecialty" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.Health-facility" /></b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.Choose-hospital-clinic" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.choose-a-good-doctor" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.examination-package" /></b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="homeheader.General-health-check" />
                                </div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i class="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className='vietnam active'>VN</div>
                            <div className='english'>EN</div>

                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='top-banner'>
                        <div className='text-title-top'>
                            <FormattedMessage id="banner.medical-foundation" />
                            {/* <FormattedMessage id="homeheader.support" /> */}

                        </div>
                        <div className='text-title-bottom' >
                            <FormattedMessage id='banner.comprehensive-health-care' />
                        </div>
                        <div className='search'>
                            <i class="fas fa-search"></i>
                            <input placeholder={(this.props.language == 'vn' ? 'Tìm phòng khám' : 'Find a clinic')} />
                        </div>
                    </div>
                    <div className='bottom-banner'>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>
                                <FormattedMessage id='banner.c1' />
                            </div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-mobile-alt"></i>
                            <div>
                                <FormattedMessage id='banner.c2' />
                            </div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-box"></i>
                            <div>
                                <FormattedMessage id='banner.c3' />
                            </div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>
                                <FormattedMessage id='banner.c4' />
                            </div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>
                                <FormattedMessage id='banner.c5' />
                            </div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>
                                <FormattedMessage id='banner.c6' />
                            </div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>
                                <FormattedMessage id='banner.c7' />
                            </div>
                        </div>
                        <div className='options'>
                            <i class="fas fa-hospital"></i>
                            <div>
                                <FormattedMessage id='banner.c8' />
                            </div>
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
