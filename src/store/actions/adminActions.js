import actionTypes from './actionTypes';
import { getAllCode, createUser, getAllUser, deleteUser, updateUser } from '../../services/userService'
import { toast } from "react-toastify"

export const fetchGenderStart = () => {
    // This form is allowed by Redux Thunk middleware
    // described below in “Async Action Creators” section.
    return async (dispatch, getState) => {
        //console.log(getState())
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCode('gender')
            if (res?.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))

            } else {
                dispatch(fetchGenderFail())
            }
        } catch (e) {
            dispatch(fetchGenderFail())
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchGenderSuccess = (resData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    genders: resData
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchRoleStart = () => {
    // This form is allowed by Redux Thunk middleware
    // described below in “Async Action Creators” section.
    return async (dispatch, getState) => {
        //console.log(getState())
        try {
            let res = await getAllCode('role')
            if (res?.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))

            } else {
                dispatch(fetchRoleFail())
            }
        } catch (e) {
            dispatch(fetchRoleFail())
            console.log('fetchGenderStart error', e)
        }
    }
}
export const fetchRoleSuccess = (resData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    roles: resData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const fetchPositionStart = () => {
    // This form is allowed by Redux Thunk middleware
    // described below in “Async Action Creators” section.
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode('position')
            if (res?.errCode === 0) {
                dispatch(fetchPositonSuccess(res.data))

            } else {
                dispatch(fetchPositonFail())
            }
        } catch (e) {
            dispatch(fetchPositonFail())
            console.log('fetchPositionStart error', e)
        }
    }
}
export const fetchPositonSuccess = (resData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    positions: resData
})

export const fetchPositonFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const createNewUser = (dataUser) => {
    // This form is allowed by Redux Thunk middleware
    // described below in “Async Action Creators” section.
    return async (dispatch, getState) => {
        try {
            let res = await createUser(dataUser)
            // console.log('res api: ', res)
            if (res?.errCode === 0) {
                toast.success('Create user success!')
                dispatch(createUserSuccess())

            } else {
                toast.error('Create user failed!')
                dispatch(createUserFail())
            }
        } catch (e) {
            toast.error('Create user error!')
            dispatch(createUserFail())
            console.log('createNewUser error', e)
        }
    }
}
export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})


export const fetchAllUser = () => {
    // This form is allowed by Redux Thunk middleware
    // described below in “Async Action Creators” section.
    return async (dispatch, getState) => {
        try {
            let res = await getAllUser('all')
            if (res?.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.user.reverse()))

            } else {
                dispatch(fetchAllUserFail())
            }
        } catch (e) {
            dispatch(fetchAllUserFail())
            console.log('fetchAllUser error', e)
        }
    }
}
export const fetchAllUserSuccess = (resUsers) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: resUsers
})

export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL
})



export const deleteAUser = (userId) => {
    // This form is allowed by Redux Thunk middleware
    // described below in “Async Action Creators” section.
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(userId)
            // console.log('res api: ', res)
            if (res?.errCode === 0) {
                toast.success('Delete user success!')
                dispatch(deleteUserSuccess())

            } else {
                toast.error('Delete user failed!')
                dispatch(deleteUserFail())
            }
        } catch (e) {
            toast.error('Delete user error!')
            dispatch(deleteUserFail())
            console.log('deleteAUser error', e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

export const editAUser = (userData) => {
    // This form is allowed by Redux Thunk middleware
    // described below in “Async Action Creators” section.
    return async (dispatch, getState) => {
        try {
            let res = await updateUser(userData)
            // console.log('res api: ', res)
            if (res?.errCode === 0) {
                toast.success('Edit user success!')
                dispatch(editUserSuccess())

            } else {
                toast.error('Edit user failed!')
                dispatch(editUserFail())
            }
        } catch (e) {
            toast.error('Edit user error!')
            dispatch(editUserFail())
            console.log('editAUser error', e)
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL
})

