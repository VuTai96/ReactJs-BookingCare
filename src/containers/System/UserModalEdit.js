import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash'

class UserModalEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }

        this.listenToEmitter();
    }
    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                email: user.email,
                password: 'asdfasdf',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            })
        }
    }
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }
    toggle = () => {
        this.props.closeModal()
    }
    handleOnchangeInput = (e, id) => {
        const copyState = { ...this.state }
        copyState[id] = e.target.value
        console.log('chay vao onchange Inputcccccc')
        this.setState({
            ...copyState
        })
    }
    checkParameter = () => {
        const array = ['email', 'password', 'firstName', 'lastName', 'address'];
        let isValid = true;
        for (let i = 0; i < array.length; i++) {
            if (!this.state[array[i]]) {
                isValid = false;
                alert(`Missing parameter in ${array[i]}`)
                break;
            }
        }
        return isValid
    }
    ClickSaveUser = () => {
        let isValid = this.checkParameter()
        if (isValid) {
            this.props.updateUser(this.state)
        }
    }
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    className="abcModal"
                    size='lg'
                >
                    <ModalHeader toggle={() => this.toggle()}>Update user</ModalHeader>
                    <ModalBody>
                        <div className='line-container'>
                            <div className='child-input'>
                                <div>Email:</div>
                                <input type="email" name="email" placeholder="Email" disabled
                                    value={this.state.email}
                                />
                            </div>
                            <div className='child-input'>
                                <div>Password:</div>
                                <input type="password" name="password" placeholder="Password" disabled
                                    value={this.state.password}
                                />
                            </div>

                            <div className='child-input'>
                                <div>First name:</div>
                                <input type="text" name="firstName" placeholder="firstName"
                                    onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                                    value={this.state.firstName}

                                />
                            </div>
                            <div className='child-input'>
                                <div>Last name:</div>
                                <input type="text" name="lastName" placeholder="lastName"
                                    onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                                    value={this.state.lastName}

                                />
                            </div>
                            <div className='child-input address'>
                                <div>Address:</div>
                                <input type="text" name="address" placeholder="Address"
                                    onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                    value={this.state.address}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className='px-3'
                            onClick={() => {
                                this.ClickSaveUser()
                            }}
                        >
                            Save
                        </Button>{' '}
                        <Button color="secondary" className='px-2' onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(UserModalEdit);
