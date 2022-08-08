import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils';
import { FormattedMessage } from 'react-intl';


class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: []
        }
    }
    componentDidMount() {
        console.log('this.props.userInfo.roleId', this.props.userInfo.roleId)
        if (this.props.userInfo.roleId === USER_ROLE.ADMIN) {
            this.setState({
                menu: adminMenu
            })
        } else if (this.props.userInfo.roleId === USER_ROLE.DOCTOR) {
            this.setState({
                menu: doctorMenu
            })
        } else {
            this.setState({
                menu: []
            })
        }
    }
    handleChangeLanguage = (language) => {
        this.props.changLanguageReduxApp(language)
    }


    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menu} />
                </div>

                {/* nút logout */}
                <div className='change-language'>
                    <span className='welcom-user'>
                        <FormattedMessage id="homeheader.welcome" />
                        {userInfo?.firstName && userInfo?.lastName ? userInfo.lastName + ' ' + userInfo.firstName : ""}!
                    </span>
                    <span className={this.props.language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                    <span className={this.props.language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    <div className="btn btn-logout" onClick={processLogout} title='logout'>
                        <i className="fas fa-sign-out-alt"></i>
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
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changLanguageReduxApp: (language) => dispatch(actions.changLanguageReduxApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
