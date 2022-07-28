import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUser, createUser, deleteUser, updateUser } from '../../services/userService'
import axios from 'axios';
import UserModal from './UserModal';
import { emitter } from '../../utils/emitter';
import UserModalEdit from './UserModalEdit';

class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUser: [],
            isOpenUserModal: false,
            isOpenUserModalEdit: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact()
    }
    getAllUserFromReact = async () => {
        let dataUser = await getAllUser('all')
        if (dataUser && dataUser.errCode === 0) {
            this.setState({
                arrUser: dataUser.user
            })
        }
    }

    handleOnclickAdd = () => {
        this.setState({
            isOpenUserModal: true
        })
    }
    handleCloseModal = () => {
        this.setState({
            isOpenUserModal: false
        })
    }
    handleCloseModalEdit = () => {
        this.setState({
            isOpenUserModalEdit: false
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createUser(data)
            if (response?.errCode === 0) {
                this.getAllUserFromReact()
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
                this.setState({
                    isOpenUserModal: false
                })
                console.log(response.message)
            } else {
                console.log(response.message)
            }

        } catch (error) {
            console.log(error)
        }
    }
    updateUser = async (data) => {
        try {
            let id = this.state.userEdit.id
            let response = await updateUser({ id, ...data })
            if (response?.errCode === 0) {
                this.getAllUserFromReact();
                this.setState({
                    isOpenUserModalEdit: false
                })
                console.log(response.message)
            } else {
                console.log(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleClickDelete = async (data) => {
        try {
            let response = await deleteUser(data)
            if (response?.errCode === 0) {
                this.getAllUserFromReact()
            } else {
                console.log(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleClickEdit = (data) => {
        this.setState({
            isOpenUserModalEdit: true,
            userEdit: data
        })
    }

    render() {

        return (
            <>
                <UserModal
                    isOpen={this.state.isOpenUserModal}
                    closeModal={this.handleCloseModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenUserModalEdit &&
                    <UserModalEdit
                        isOpen={this.state.isOpenUserModalEdit}
                        closeModal={this.handleCloseModalEdit}
                        currentUser={this.state.userEdit}
                        updateUser={this.updateUser}
                    />
                }
                <div className="title">Manage users with babyShark</div>
                <div className='mx-2'>
                    <button type="button" className="btn btn-primary px-3" onClick={() => this.handleOnclickAdd()}>
                        <i className="fas fa-plus"></i> Add user
                    </button>
                </div>
                <div className='users-container mt-3 mx-2'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.arrUser.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={() => this.handleClickEdit(item)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className='btn-delete'
                                                onClick={() => this.handleClickDelete(item)}
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>

                                        </td>


                                    </tr>
                                )
                            })
                            }


                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}
const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
