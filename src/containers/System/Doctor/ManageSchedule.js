import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
// import './ManageSchedule.scss'
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/constant'
import { getDetailDoctor, updateDetailDoctor } from '../../../services/userService'
import { toast } from 'react-toastify';
import Header from '../../../containers/Header/Header'


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let { isLoggedIn } = this.props
        return (
            <>
                {isLoggedIn && <Header />}
                <div className='container'>
                    hello manage schedule

                </div>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
        doctors: state.admin.allDoctors,
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        createDetailDoctor: (detailDoctor) => dispatch(actions.saveDetailDoctor(detailDoctor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
