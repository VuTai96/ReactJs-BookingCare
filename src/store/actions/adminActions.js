import actionTypes from './actionTypes';
import { getAllCode, createUser } from '../../services/userService'


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
                dispatch(createUserSuccess())

            } else {
                dispatch(createUserFail())
            }
        } catch (e) {
            dispatch(createUserFail())
            console.log('fetchPositionStart error', e)
        }
    }
}
export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})



