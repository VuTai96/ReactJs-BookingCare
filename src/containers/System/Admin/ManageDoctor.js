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
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            optionDoctors: [],
            description: '',
            isMarkdown: false
        }
    }
    async componentDidMount() {
        await this.props.fetchAllDoctors()

    }
    setOptionDoctor = (doctors) => {
        let option = [];
        doctors.map((item, index) => {
            let obj = {}
            if (this.props.language === LANGUAGES.VI) {
                obj.label = `${item.lastName} ${item.firstName}`
                obj.value = item.id
            }
            if (this.props.language === LANGUAGES.EN) {
                obj.label = `${item.firstName} ${item.lastName}`
                obj.value = item.id
            }
            option.push(obj)
        })
        return option
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.doctors !== this.props.doctors) {
            let option = this.setOptionDoctor(this.props.doctors)
            this.setState({
                optionDoctors: option
            })
        }
        if (prevProps.language !== this.props.language) {
            let option = this.setOptionDoctor(this.props.doctors)
            let a = option.filter(item => item.value === this.state.selectedDoctor.value)
            this.setState({
                optionDoctors: option,
                selectedDoctor: a[0] || ''
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
        const { selectedDoctor, description, optionDoctors, contentMarkdown, isMarkdown } = this.state;
        return (
            <div className='container'>
                <div className='row'>
                    <div className='title my-3'>
                        Tạo thêm thông tin Doctor
                    </div>
                    <div className='col-5'>
                        <div className='mb-2'>Chọn bác sĩ:</div>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={optionDoctors}
                        />
                    </div>

                    <div className='col-7 mb-3'>
                        <div className='mb-2'>Thông tin giới thiệu:</div>
                        <textarea className="form-control" rows='3'
                            value={description}
                            onChange={(e) => this.handleOnchangeDesc(e)}
                        ></textarea>

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
                        <span>Lưu thông tin</span>
                        :
                        <span>Tạo thông tin</span>
                    }
                </button>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        doctors: state.admin.allDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        createDetailDoctor: (detailDoctor) => dispatch(actions.saveDetailDoctor(detailDoctor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
