import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCode } from '../../../services/userService'
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'

class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrGender: [],
            arrPosition: [],
            arrRole: []
        }
    }

    async componentDidMount() {
        await this.props.fetchGenderStart()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                arrGender: this.props.data
            })
        }
    }

    render() {
        let genders = this.state.arrGender;
        let language = this.props.language
        return (
            <div className="user-redux-container">
                <div className='title my-3'>
                    <FormattedMessage id="manage-user.add" />
                </div>
                <div className='container'>
                    <form className="row g-3" href='#'>
                        <div className="col-md-3">
                            <label htmlFor="inputEmail4" className="form-label">
                                <FormattedMessage id="manage-user.email" />
                            </label>
                            <input type="email" className="form-control" id="inputEmail4" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputPassword4" className="form-label">
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input type="password" className="form-control" id="inputPassword4" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="firstName" className="form-label">
                                <FormattedMessage id="manage-user.first-name" />
                            </label>
                            <input type="text" className="form-control" id="firstName" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="lastName" className="form-label">
                                <FormattedMessage id="manage-user.last-name" />
                            </label>
                            <input type="text" className="form-control" id="lastName" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="phoneNumber" className="form-label">
                                <FormattedMessage id="manage-user.phone-number" />
                            </label>
                            <input type="text" className="form-control" id="phoneNumber" />
                        </div>
                        <div className="col-md-9">
                            <label htmlFor="inputAddress" className="form-label">
                                <FormattedMessage id="manage-user.address" />
                            </label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="inputState" className="form-label">
                                <FormattedMessage id="manage-user.gender" />
                            </label>
                            <select id="inputState" className="form-select">
                                {
                                    genders.map((item, index) => {
                                        return <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputState" className="form-label">
                                <FormattedMessage id="manage-user.position" />
                            </label>
                            <select id="inputState" className="form-select">
                                <option defaultValue>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputState" className="form-label">
                                <FormattedMessage id="manage-user.role" />
                            </label>
                            <select id="inputState" className="form-select">
                                <option defaultValue>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputImage" className="form-label">
                                <FormattedMessage id="manage-user.image" />
                            </label>
                            <input type="text" className="form-control" id="inputImage" />
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                <FormattedMessage id="manage-user.save" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        data: state.admin.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
