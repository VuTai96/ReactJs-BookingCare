import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctor: [],
    allDoctors: [],
    rangeTime: [],
    allRequiredDoctorInfor: {}
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('Fetch gender is get data ...', action)
            return {
                ...state,
                isLoadingGender: true
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log('Fetch gender is success!')
            return {
                ...state,
                genders: action.genders,
                isLoadingGender: false
            }
        case actionTypes.FETCH_GENDER_FAIL:
            console.log('Fetch gender is fail!')
            return {
                ...state,
                isLoadingGender: false
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            console.log('Fetch role is success!')
            return {
                ...state,
                roles: action.roles,
            }
        case actionTypes.FETCH_ROLE_FAIL:
            console.log('Fetch role is fail!')
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            console.log('Fetch position is success!')
            return {
                ...state,
                positions: action.positions,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            console.log('Fetch position is fail!')
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_SUCCESS:
            console.log('Creat user is success!')
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_FAIL:
            console.log('Creat user is fail!')
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            console.log('fetch all user is success!')
            return {
                ...state,
                users: action.users
            }
        case actionTypes.FETCH_ALL_USER_FAIL:
            console.log('fetch all user is fail!')
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            return {
                ...state,
                topDoctor: action.data
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            return {
                ...state,
                topDocTor: action.data
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            return {
                ...state,
                allDoctors: action.data
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            return {
                ...state,
                allDoctors: action.data
            }
        case actionTypes.FETCH_SCHEDULE_TIME_SUCCESS:
            return {
                ...state,
                rangeTime: action.data
            }
        case actionTypes.FETCH_SCHEDULE_TIME_FAIL:
            return {
                ...state,
                rangeTime: []
            }

        case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS:
            return {
                ...state,
                allRequiredDoctorInfor: action.data
            }
        case actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAIL:
            return {
                ...state,
                allRequiredDoctorInfor: {}
            }


        default:
            return state;
    }
}

export default adminReducer;