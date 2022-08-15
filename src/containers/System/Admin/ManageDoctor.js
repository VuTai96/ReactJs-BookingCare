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
        if (type === "USER") {
            data.map((item, index) => {
                let nameVi = `${item.lastName} ${item.firstName}`
                let nameEn = `${item.firstName} ${item.lastName}`

                let obj = {}
                obj.value = item.id
                if (this.props.language === LANGUAGES.VI) {
                    obj.label = nameVi
                }
                if (this.props.language === LANGUAGES.EN) {
                    obj.label = nameEn
                }
                option.push(obj)
            })
        }
        if (type === "PRICE") {
            data.map((item, index) => {
                let nameVi = item.valueVi + 'vnđ'
                let nameEn = item.valueEn + '$'

                let obj = {}
                obj.value = item.keyMap
                if (this.props.language === LANGUAGES.VI) {
                    obj.label = nameVi
                }
                if (this.props.language === LANGUAGES.EN) {
                    obj.label = nameEn
                }
                option.push(obj)
            })
        }
        if (type === "PAMENT" || type === 'PROVINCE') {
            data.map((item, index) => {
                let nameVi = item.valueVi
                let nameEn = item.valueEn

                let obj = {}
                obj.value = item.keyMap
                if (this.props.language === LANGUAGES.VI) {
                    obj.label = nameVi
                }
                if (this.props.language === LANGUAGES.EN) {
                    obj.label = nameEn
                }
                option.push(obj)
            })
        }
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
            let optionPrice = this.setOptionDoctor(resPrice, 'PRICE')
            let optionPayment = this.setOptionDoctor(resPayment, 'PAMENT')
            let optionProvince = this.setOptionDoctor(resProvince, 'PROVINCE')
            this.setState({
                optionPrice: optionPrice,
                optionPayment: optionPayment,
                optionProvince: optionProvince,
            })
        }
        if (prevProps.language !== this.props.language) {
            let optionDoctor = this.setOptionDoctor(this.props.doctors, 'USER')
            let oldDoctor = optionDoctor.filter(item => item.value === this.state.selectedDoctor.value)

            let { allRequiredDoctorInfor } = this.props
            let optionPrice = this.setOptionDoctor(allRequiredDoctorInfor?.resPrice || [], 'PRICE')
            let oldPrice = optionPrice.filter(item => item.value === this.state.selectedPrice.value)
            let optionPayment = this.setOptionDoctor(allRequiredDoctorInfor?.resPayment || [], 'PAMENT')
            let oldPayment = optionPayment.filter(item => item.value === this.state.selectedPayment.value)
            let optionProvince = this.setOptionDoctor(allRequiredDoctorInfor?.resProvince || [], 'PROVINCE')
            let oldProvince = optionProvince.filter(item => item.value === this.state.selectedProvince.value)
            this.setState({
                optionDoctors: optionDoctor,
                selectedDoctor: oldDoctor[0] || '',
                optionPrice: optionPrice,
                selectedPrice: oldPrice[0] || '',
                optionPayment: optionPayment,
                selectedPayment: oldPayment[0] || '',
                optionProvince: optionProvince,
                selectedProvince: oldProvince[0] || '',

            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleChangeDoctor = async (selectedDoctor) => {
        let response = await getDetailDoctor(selectedDoctor.value)
        // console.log('response.data.Markdown', response.data.Markdown)
        // if (response.data) {
        // selectedPrice: '',
        // selectedPayment: '',
        // selectedProvince: '',
        let priceId = response.data?.Doctor_Infor?.priceId || '',
            provinceId = response.data?.Doctor_Infor?.provinceId || '',
            paymentId = response.data?.Doctor_Infor?.paymentId || ''
        let selectedPrice = this.state.optionPrice.find(item => item.value === priceId)
        let selectedProvince = this.state.optionProvince.find(item => item.value === provinceId)
        let selectedPayment = this.state.optionPayment.find(item => item.value === paymentId)

        this.setState({
            selectedDoctor,
            contentMarkdown: response.data?.Markdown?.contentMarkdown || '',
            contentHTML: response.data?.Markdown?.contentHTML || '',
            description: response.data?.Markdown?.description || '',
            isMarkdown: response.data?.Markdown?.id ? true : false,
            addressClinic: response.data?.Doctor_Infor?.addressClinic || '',
            nameClinic: response.data?.Doctor_Infor?.nameClinic || '',
            note: response.data?.Doctor_Infor?.note || '',
            selectedPrice: selectedPrice || '',
            selectedProvince: selectedProvince || '',
            selectedPayment: selectedPayment || '',
        })
        // }
        // this.setState({
        //     selectedDoctor

        // })
    }
    handleSaveContentMarkdown = async () => {
        let detailDoctor = {
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            description: this.state.description,
            doctorId: this.state.selectedDoctor?.value || "",

            selectedPrice: this.state.selectedPrice?.value || "",
            selectedPayment: this.state.selectedPayment?.value || "",
            selectedProvince: this.state.selectedProvince?.value || "",
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        }
        await this.props.createDetailDoctor(detailDoctor)

        // if (!this.state.isMarkdown) {
        //     await this.props.createDetailDoctor(detailDoctor)
        // } else {
        //     let res = await updateDetailDoctor(detailDoctor)
        //     if (res.errCode === 0) {
        //         toast.success(res.message)
        //     } else {
        //         toast.error(res.message)
        //     }
        // }
    }
    handleOnchangeText = (e, id) => {
        let cpState = this.state
        cpState[id] = e.target.value
        this.setState({
            ...cpState
        })
    }
    handleChangeSelectedDoctorInfor = async (selectedOption, name) => {
        let stateSelect = name.name
        let copyState = { ...this.state }
        copyState[stateSelect] = selectedOption
        this.setState({
            ...copyState
        })
    }
    render() {
        let { allRequiredDoctorInfor } = this.props
        const { selectedDoctor, description, optionDoctors, contentMarkdown, isMarkdown,
            optionPrice, optionPayment, optionProvince,
            selectedPrice, selectedPayment, selectedProvince,
            nameClinic, addressClinic, note } = this.state;
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
                            onChange={this.handleChangeDoctor}
                            options={optionDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
                        />
                    </div>
                    <div className='col-7 mb-3'>
                        <div className='mb-2'>
                            <FormattedMessage id="admin.manage-doctor.description" />
                        </div>
                        <textarea className="form-control" rows='3'
                            value={description}
                            onChange={(e) => this.handleOnchangeText(e, 'description')}
                        ></textarea>

                    </div>

                    <div className='col-4'>
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleChangeSelectedDoctorInfor}
                            options={optionPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name={'selectedPrice'}
                        />
                    </div>
                    <div className='col-4'>
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleChangeSelectedDoctorInfor}
                            options={optionPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name={'selectedPayment'}

                        />
                    </div>
                    <div className='col-4 mb-3'>
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChangeSelectedDoctorInfor}
                            options={optionProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name={'selectedProvince'}

                        />
                    </div>

                    <div className='col-4'>
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input type="text" class="form-control"
                            value={nameClinic}
                            onChange={(e) => this.handleOnchangeText(e, 'nameClinic')}
                        />
                    </div>
                    <div className='col-4'>
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input type="text" class="form-control"
                            value={addressClinic}
                            onChange={(e) => this.handleOnchangeText(e, 'addressClinic')}
                        />
                    </div>
                    <div className='col-4'>
                        <label className="form-label"><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input type="text" class="form-control"
                            value={note}
                            onChange={(e) => this.handleOnchangeText(e, 'note')}
                        />
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
