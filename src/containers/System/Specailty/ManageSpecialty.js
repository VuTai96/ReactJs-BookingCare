import axios from 'axios';
import React, { Component } from 'react';
import { connect } from "react-redux";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';
import { postCreateSpecialty } from '../../../services/userService'
// import 'react-markdown-editor-lite/lib/index.css'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }
    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, revState, snapshot) {
        if (prevProps.language !== this.props.language) {
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }
    handleChangeInput = (e, id) => {
        let cstate = { ...this.state }
        cstate[id] = e.target.value
        this.setState({
            ...cstate
        })
    }
    handleUploadImage = async (e) => {
        let file = e.target.files[0]
        if (file) {
            let res = await CommonUtils.toBase64(file)
            this.setState({
                imageBase64: res,
            })
        }
    }
    handleOnclickSave = async () => {
        let response = await postCreateSpecialty({
            ...this.state
        })
        if (response.errCode === 0) {
            toast.success(response.errMessage)
        } else {
            toast.error(response.errMessage)
        }
    }
    render() {
        console.log(this.state)
        return (
            <div className='manage-specialty-container container'>
                <div className='title'>
                    Manage specialty
                </div>
                <div className='row mt-3'>
                    <div class="col-6">
                        <label class="form-label">specialty name:</label>
                        <input class="form-control"
                            value={this.state.name}
                            onChange={(e) => this.handleChangeInput(e, 'name')}
                        />
                    </div>
                    <div class="col-6">
                        <label for="formFile" class="form-label">Avata specialty</label>
                        <input class="form-control" type="file" id="formFile"
                            onChange={(e) => this.handleUploadImage(e)}
                        />
                    </div>
                    <div className='col-12 mt-3'>
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12 mt-3'>
                        <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => this.handleOnclickSave()}
                        >
                            Save</button>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
