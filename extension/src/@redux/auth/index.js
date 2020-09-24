import enhanceReducerWithWriteLocalStorage from "../enhanceReducerWithWriteLocalStorage.js";

import initialState from "./initialState";

const authReducer = (state = initialState, action) => {
    // const nextState = authAsyncReducer(state, action)

    switch (action.type) {
        //Sign in Actions
        case "@auth/SIGN_IN_START":
            return {
                isLoading: true,
                data: {}
            };
        case "@auth/SIGN_IN_ERROR":
            return {
                isLoading: false,
                data: {}
            };
        case "@auth/SIGN_IN_SUCCESS":
            return {
                isLoading: false,
                data: action.payload
            };

        case "@auth/SIGN_OUT":
            return {
                isLoading: false,
                data: {}
            };

        //Sign up Actions
        case "@auth/SIGN_UP_START":
            return {
                isLoading: true,
                data: {}
            };

        case "@auth/SIGN_UP_ERROR":
            return {
                isLoading: false,
                data: action.payload
            };

        case "@auth/SIGN_UP_SUCCESS":
            return {
                isLoading: false,
                data: action.payload
            };

        //Update Personal Information Actions
        case "@auth/UPDATE_PERSONAL_INFO_START":
            return {
                ...state,
                isUpdating: true
            };

        case "@auth/UPDATE_PERSONAL_INFO_ERROR":
            return {
                ...state,
                isUpdating: false
            };

        case "@auth/UPDATE_PERSONAL_INFO_SUCCESS":
            return {
                isUpdating: false,
                data: action.payload
            };

        //Forget password request actions
        case "@auth/PASSWORD_RESET_REQUEST_START":
            return {
                isLoading: true,
                data: {}
            };

        case "@auth/PASSWORD_RESET_REQUEST_ERROR":
            return {
                isLoading: false,
                data: action.payload
            };

        case "@auth/PASSWORD_RESET_REQUEST_SUCCESS":
            return {
                isLoading: false,
                data: action.payload
            };

        //Password Reset actions
        case "@auth/PASSWORD_RESET_START":
            return {
                isLoading: true,
                data: {}
            };

        case "@auth/PASSWORD_RESET_ERROR":
            return {
                isLoading: false,
                data: action.payload
            };

        case "@auth/PASSWORD_RESET_SUCCESS":
            return {
                isLoading: false,
                data: action.payload
            };

        case "@auth/EMAIL_CONFIRMATION_START":
            return {
                ...state,
                isLoading: true
            };

        case "@auth/EMAIL_CONFIRMATION_ERROR":
            return {
                ...state,
                isLoading: false
            };

        case "@auth/EMAIL_CONFIRMATION_SUCCESS":
            return {
                isLoading: false,
                data: action.payload
            };

        default:
            return state;
    }
};

export default enhanceReducerWithWriteLocalStorage("@auth")(authReducer);
