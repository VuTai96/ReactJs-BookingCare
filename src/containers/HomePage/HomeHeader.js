import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../utils';
import * as action from '../../store/actions'
import { path } from '../../utils/constant'
import { withRouter } from 'react-router-dom'



class Home extends Component {


    changLangguage = (language) => {
        this.props.changLanguageReduxApp(language)
    }
    clickToHomePage = () => {
        this.props.history.push(path.HOMEPAGE)
    }
    render() {


        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo' onClick={() => this.clickToHomePage()}></div>
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
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className={this.props.language === LANGUAGES.VI ? 'vietnam active' : 'vietnam'}><span onClick={() => this.changLangguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={this.props.language === LANGUAGES.EN ? 'english active' : 'english'}><span onClick={() => this.changLangguage(LANGUAGES.EN)}>EN</span></div>

                        </div>
                    </div>
                </div>
                {this.props.showBaner &&
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
                                <i className="fas fa-search"></i>
                                <input placeholder={(this.props.language == LANGUAGES.VI ? 'Tìm phòng khám' : 'Find a clinic')} />
                            </div>
                        </div>
                        <div className='bottom-banner'>
                            <div className='options'>
                                <i className="fas fa-hospital"></i>
                                <div>
                                    <FormattedMessage id='banner.c1' />
                                </div>
                            </div>
                            <div className='options'>
                                <i className="fas fa-mobile-alt"></i>
                                <div>
                                    <FormattedMessage id='banner.c2' />
                                </div>
                            </div>
                            <div className='options'>
                                <i className="fas fa-box"></i>
                                <div>
                                    <FormattedMessage id='banner.c3' />
                                </div>
                            </div>
                            <div className='options'>
                                <i className="fas fa-hospital"></i>
                                <div>
                                    <FormattedMessage id='banner.c4' />
                                </div>
                            </div>
                            <div className='options'>
                                <i className="fas fa-hospital"></i>
                                <div>
                                    <FormattedMessage id='banner.c5' />
                                </div>
                            </div>
                            <div className='options'>
                                <i className="fas fa-hospital"></i>
                                <div>
                                    <FormattedMessage id='banner.c6' />
                                </div>
                            </div>
                            <div className='options'>
                                <i className="fas fa-hospital"></i>
                                <div>
                                    <FormattedMessage id='banner.c7' />
                                </div>
                            </div>
                            <div className='options'>
                                <i className="fas fa-hospital"></i>
                                <div>
                                    <FormattedMessage id='banner.c8' />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
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
        changLanguageReduxApp: (language) => dispatch(action.changLanguageReduxApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
