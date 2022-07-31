import actionTypes from '../actions/actionTypes';

const initialState = {
    data: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log('Fetch gender is success!')
            return {
                ...state,
                data: action.data
            }
        case actionTypes.FETCH_GENDER_FAIL:
            console.log('Fetch gender is fail!')
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;