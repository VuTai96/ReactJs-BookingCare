import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUser } from '../../services/userService'
import axios from 'axios';
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUser: []

        }
    }

    async componentDidMount() {
        let dataUser = await getAllUser('all')
        if (dataUser && dataUser.errCode === 0) {
            this.setState({
                arrUser: dataUser.user
            })
        }
    }


    render() {
        console.log(this.state.arrUser)
        return (
            <>
                <div className="title">Manage users with babyShark</div>
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
                                            <button className='btn-edit' >
                                                <i class="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className='btn-delete'>
                                                <i class="fas fa-trash-alt"></i>
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
