import actionTypes from './actionTypes';
import {
    getAllCode, createUser, getAllUser, deleteUser, updateUser,
    getTopDoctorHomeService, getAllDoctors, postDetailDoctor
} from '../../services/userService'
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

export const fetchTopDoctor = (limit) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(limit);
            if (res?.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    data: res.data
                })

            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
                    data: []
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
                data: []
            })
            console.log('editAUser error', e)
        }
    }
}
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res?.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    data: res.doctors
                })

            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
                    data: []
                })
            }
        } catch (e) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
                data: []
            })
            console.log('editAUser error', e)
        }
    }
}

export const saveDetailDoctor = (detailDoctor) => {
    return async (dispatch, getState) => {
        try {
            let res = await postDetailDoctor(detailDoctor);
            if (res?.errCode === 0) {
                toast.success(res.message)
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error(res.message)
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
                })
            }
        } catch (e) {
            toast.success('saveDetailDoctor is error')
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
            })
            console.log('editAUser error', e)
        }
    }
}

export const fetchScheduleTime = (Type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode(Type);
            if (res?.errCode === 0) {
                toast.success(res.message)
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_TIME_SUCCESS,
                    data: res.data
                })
            } else {
                toast.success(res.message)
                dispatch({
                    type: actionTypes.FETCH_SCHEDULE_TIME_FAIL,
                })
            }
        } catch (e) {
            toast.success('saveDetailDoctor is error')
            dispatch({
                type: actionTypes.FETCH_SCHEDULE_TIME_FAIL,
            })
            console.log('editAUser error', e)
        }
    }
}

export const fetchRequireDoctorInfor = () => {
    return async (dispatch, getState) => {
        //console.log(getState())
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCode('PRICE')
            let resPayment = await getAllCode('PAYMENT')
            let resProvince = await getAllCode('PROVINCE')

            if (resPrice?.errCode === 0 &&
                resPayment?.errCode === 0 &&
                resProvince?.errCode === 0) {
                let resData = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                }
                dispatch(fetchRequireDoctorInforSuccess(resData))
            } else {
                dispatch(fetchRequireDoctorInforFail())
            }
        } catch (e) {
            dispatch(fetchRequireDoctorInforFail())
            console.log('fetchGenderStart error', e)
        }
    }
}

export const fetchRequireDoctorInforSuccess = (resData) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS,
    data: resData
})

export const fetchRequireDoctorInforFail = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAIL
})