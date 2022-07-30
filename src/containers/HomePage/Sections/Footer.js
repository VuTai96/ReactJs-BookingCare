import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import './Sections.scss'

class Footer extends Component {
    render() {
        return (
            <div className='Footer-contain'>
                <div>
                    &copy; VuTai 30-07-2022, my github &rarr;<a href='https://github.com/VuTai96?tab=repositories' target='_blank'>Click me</a>&larr;
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
