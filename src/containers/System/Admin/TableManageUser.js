import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'

class TableManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listUser: []
        }
    }
    async componentDidMount() {
        await this.props.fetchAllUser()
        this.setState({
            listUser: this.props.users
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                listUser: this.props.users
            })
        }
    }
    handleClickDelete = async (item) => {
        await this.props.deleteAUser(item)
        await this.props.fetchAllUser()
    }
    handleClickEdit = (item) => {
        this.props.editUserforprops(item)
    }

    render() {
        let { listUser } = this.state
        return (
            <div className='users-container my-3'>
                <table id="TableManageUser">
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
                        {listUser.map((item, index) => {

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
