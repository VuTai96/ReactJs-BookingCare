import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';
import { LANGUAGES } from '../../../utils/constant'
import { getDetailDoctor, updateDetailDoctor } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            optionDoctors: [],
            description: '',
            isMarkdown: false,

            //save to doctor_infor table
            optionPrice: [],
            optionPayment: [],
            optionProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }
    async componentDidMount() {
        await this.props.fetchAllDoctors()
        await this.props.fetchRequireDoctorInfor()

    }
    setOptionDoctor = (data, type) => {
        let option = [];
        data.map((item, index) => {
            let nameVi = type === 'USER' ? `${item.lastName} ${item.firstName}` : item.valueVi
            let nameEn = type === 'USER' ? `${item.firstName} ${item.lastName}` : item.valueEn

            let obj = {}
            obj.value = type === 'USER' ? item.id : item.keyMap
            if (this.props.language === LANGUAGES.VI) {
                obj.label = nameVi
            }
            if (this.props.language === LANGUAGES.EN) {
                obj.label = nameEn
            }
            option.push(obj)
        })
        return option
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.doctors !== this.props.doctors) {
            let optionDoctors = this.setOptionDoctor(this.props.doctors, 'USER')
            this.setState({
                optionDoctors: optionDoctors
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor
            let optionPrice = this.setOptionDoctor(resPrice)
            let optionPayment = this.setOptionDoctor(resPayment)
            let optionProvince = this.setOptionDoctor(resProvince)
            this.setState({
                optionPrice: optionPrice,
                optionPayment: optionPayment,
                optionProvince: optionProvince,
            })
        }
        if (prevProps.language !== this.props.language) {
            let optionDoctor = this.setOptionDoctor(this.props.doctors, 'USER')
            let oldDoctor = optionDoctor.filter(item => item.value === this.state.selectedDoctor.value)

            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor
            let optionPrice = this.setOptionDoctor(resPrice)
            let oldPrice = optionPrice.filter(item => item.value === this.state.selectedPrice.value)
            let optionPayment = this.setOptionDoctor(resPayment)
            let oldPayment = optionPayment.filter(item => item.value === this.state.selectedPayment.value)
            let optionProvince = this.setOptionDoctor(resProvince)
            let oldProvince = optionProvince.filter(item => item.value === this.state.selectedProvince.value)
            this.setState({
                optionDoctors: optionDoctor,
                selectedDoctor: oldDoctor[0] || '',

                optionPrice: optionPrice,
                selectedDoctor: oldPrice[0] || '',
                optionPayment: optionPayment,
                selectedDoctor: oldPayment[0] || '',
                optionProvince: optionProvince,
                selectedDoctor: oldProvince[0] || '',

            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleChange = async (selectedDoctor) => {
        let response = await getDetailDoctor(selectedDoctor.value)
        console.log('response.data.Markdown', response.data.Markdown)
        if (response.data.Markdown.id) {
            this.setState({
                contentMarkdown: response.data.Markdown?.contentMarkdown || '',
                contentHTML: response.data.Markdown?.contentHTML || '',
                description: response.data.Markdown?.description || '',
                isMarkdown: true
            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                isMarkdown: false
            })
        }
        this.setState({
            selectedDoctor
        })
    }
    handleSaveContentMarkdown = async () => {
        let detailDoctor = {
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        }
        if (!this.state.isMarkdown) {
            await this.props.createDetailDoctor(detailDoctor)
        } else {
            let res = await updateDetailDoctor(detailDoctor)
            if (res.errCode === 0) {
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        }
    }
    handleOnchangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    render() {
        let { allRequiredDoctorInfor } = this.props
        console.log('allRequiredDoctorInfor', allRequiredDoctorInfor)
        const { selectedDoctor, description, optionDoctors, contentMarkdown, isMarkdown,
            optionPrice, optionPayment, optionProvince,
            selectedPrice, selectedPayment, selectedProvince } = this.state;
        console.log('check list- price - payment-province', optionPrice, optionPayment, optionProvince)
        return (
            <div className='container'>
                <div className='row mb-5'>
                    <div className='title my-3'>
                        <FormattedMessage id="admin.manage-doctor.title" />
                    </div>
                    <div className='col-5'>
                        <div className='mb-2'>
                            <FormattedMessage id="admin.manage-doctor.choose-doctor" />
                        </div>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={optionDoctors}
                            placeholder={'chọn bác sĩ'}
                        />
                    </div>
                    <div className='col-7 mb-3'>
                        <div className='mb-2'>
                            <FormattedMessage id="admin.manage-doctor.description" />
                        </div>
                        <textarea className="form-control" rows='3'
                            value={description}
                            onChange={(e) => this.handleOnchangeDesc(e)}
                        ></textarea>

                    </div>

                    <div className='col-4'>
                        <label className="form-label">Chọn giá</label>
                        <Select
                            // value={selectedPrice}
                            // onChange={this.handleChange}
                            options={optionPrice}
                            placeholder={'Chọn giá'}
                        />
                    </div>
                    <div className='col-4'>
                        <label className="form-label">Chọn phương thức thanh toán</label>
                        <Select
                            // value={selectedPayment}
                            // onChange={this.handleChange}
                            options={optionPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                        />
                    </div>
                    <div className='col-4'>
                        <label className="form-label">Chọn tỉnh thành</label>
                        <Select
                            // value={selectedProvince}
                            // onChange={this.handleChange}
                            options={optionProvince}
                            placeholder={'Chọn tỉnh thành'}
                        />
                    </div>

                    <div className='col-4'>
                        <label className="form-label">Chọn giá</label>
                        <input type="text" class="form-control" />
                    </div>
                    <div className='col-4'>
                        <label className="form-label">Chọn giá</label>
                        <input type="text" class="form-control" />
                    </div>
                    <div className='col-4'>
                        <label className="form-label">Chọn giá</label>
                        <input type="text" class="form-control" />
                    </div>

                </div>


                <MdEditor style={{ height: '450px' }}
                    value={contentMarkdown}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                />
                <button type="button"
                    className={isMarkdown ? "btn btn-warning mt-3" : "btn btn-primary mt-3"}
                    onClick={() => this.handleSaveContentMarkdown()}
                >
                    {isMarkdown ?
                        <span><FormattedMessage id="admin.manage-doctor.save" /></span>
                        :
                        <span><FormattedMessage id="admin.manage-doctor.add" /></span>
                    }
                </button>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        doctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        createDetailDoctor: (detailDoctor) => dispatch(actions.saveDetailDoctor(detailDoctor)),

        fetchRequireDoctorInfor: () => dispatch(actions.fetchRequireDoctorInfor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
