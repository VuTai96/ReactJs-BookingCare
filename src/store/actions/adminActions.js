import actionTypes from './actionTypes';
import { getAllCode } from '../../services/userService'


export const fetchGenderStart = () => {
    // This form is allowed by Redux Thunk middleware
    // described below in “Async Action Creators” section.
    return async (dispatch, getState) => {
        //console.log(getState())
        try {
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
    data: resData
})

export const fetchGenderFail = () => ({
    type: actionTypes.AFETCH_GENDER_FAIL
})

