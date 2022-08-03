import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss'
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const mdParser = new MarkdownIt(/* Markdown-it options */);

class TableManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: ''
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleChange = (selectedDoctor) => {
        this.setState({
            selectedDoctor
        })
    }
    handleSaveContentMarkdown = () => {
        console.log('>>>Check state', this.state)
    }
    handleOnchangeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }
    render() {
        const { selectedDoctor, description } = this.state;
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
                            options={options}
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
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                />
                <button type="button" className="btn btn-warning mt-3"
                    onClick={() => this.handleSaveContentMarkdown()}
                >Lưu thông tin</button>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUser: () => dispatch(actions.fetchAllUser()),
        deleteAUser: (userId) => dispatch(actions.deleteAUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
