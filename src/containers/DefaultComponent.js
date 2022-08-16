import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }
    render() {
        return (
            <div>Hello default Component</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
