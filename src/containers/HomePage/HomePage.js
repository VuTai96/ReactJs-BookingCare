import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import MedicalFacility from './Sections/MedicalFacility';
import Specialty from './Sections/Specialty';
import OutStandingDoctor from './Sections/OutStandingDoctor'
import Handbook from './Sections/Handbook'
import About from './Sections/About';
import Footer from './Sections/Footer'
class Home extends Component {

    render() {


        return (
            <div>
                <HomeHeader />
                <Specialty />
                <MedicalFacility />
                <OutStandingDoctor />
                <Handbook />
                <About />
                <Footer />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
