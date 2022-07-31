import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app


class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrGender: [],
            arrPosition: [],
            arrRole: [],
            urlImage: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        await this.props.fetchGenderStart()
        await this.props.fetchRoleStart()
        await this.props.fetchPositionStart()

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                arrGender: this.props.genders
            })
        }
        if (prevProps.roles !== this.props.roles) {
            this.setState({
                arrRole: this.props.roles
            })
        }
        if (prevProps.positions !== this.props.positions) {
            this.setState({
                arrPosition: this.props.positions
            })
        }
    }

    handleUploadImage = (e) => {
        console.log(e.target.files[0])
        let file = e.target.files[0]
        if (file) {
            let urlLink = URL.createObjectURL(file)
            this.setState({
                urlImage: urlLink
            })
        }
    }
    handleOnclickViewImage = () => {
        console.log('....', this.state.urlImage)
        if (this.state.urlImage) {
            this.setState({
                isOpen: true
            })
        }
    }

    render() {
        let { arrGender, arrPosition, arrRole, urlImage, isOpen } = this.state
        let { language, isLoadingGender } = this.props;
        console.log(isOpen, urlImage)
        return (
            <div className="user-redux-container">
                <div className='title my-3'>
                    <FormattedMessage id="manage-user.add" />
                </div>
                <div className='container'>
                    <div className='col-md-12'>{isLoadingGender ? 'Loading data...' : ''}</div>
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
                                    arrGender.map((item, index) => {
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
                                {
                                    arrPosition.map((item, index) => {
                                        return <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inputState" className="form-label">
                                <FormattedMessage id="manage-user.role" />
                            </label>
                            <select id="inputState" className="form-select">
                                {
                                    arrRole.map((item, index) => {
                                        return <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">

                            <label htmlFor="inputState" className="form-label">
                                <FormattedMessage id="manage-user.image" />
                            </label>
                            <div className='preview-image-container'>
                                <label htmlFor="inputImage" className="label-upload" >
                                    <FormattedMessage id="manage-user.upload" /><i class="fas fa-upload"></i>
                                </label>
                                <input type="file" className="form-control" id="inputImage" hidden onChange={(e) => this.handleUploadImage(e)} />
                                <div className='preview-image'
                                    onClick={() => this.handleOnclickViewImage()}
                                    style={{
                                        backgroundImage: `url("${urlImage}")`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat'
                                    }}>
                                </div>
                            </div>

                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                <FormattedMessage id="manage-user.save" />
                            </button>
                        </div>
                    </form>
                </div>
                {
                    isOpen && (
                        <Lightbox
                            mainSrc={urlImage}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roles: state.admin.roles,
        positions: state.admin.positions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
