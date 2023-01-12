import {
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_FORGOT_PASSWORD_REQUEST,
  GET_FORGOT_PASSWORD_SUCCESS,
  GET_FORGOT_PASSWORD_FAILED,
  GET_RESET_PASSWORD_REQUEST,
  GET_RESET_PASSWORD_SUCCESS,
  GET_RESET_PASSWORD_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  USER_IS_AUTHORIZED,
  SET_USER_DATA,
  CLEAR_USER_DATA,
  GET_UPDATE_USER_REQUEST,
  GET_UPDATE_USER_SUCCESS,
  GET_UPDATE_USER_FAILED,
  SET_PASSWORD
} from '../actions/user';

const initialState = {
  registerRequest: false,
  registerSuccess: false,
  registerFailed: null,

  loginRequest: false,
  loginSuccess: false,
  loginFailed: null,

  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: null,

  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: null,

  logoutRequest: false,
  logoutSuccess: false,
  logoutFailed: null,

  userRequest: false,
  userSuccess: false,
  userFailed: null,

  userUpdateRequest: false,
  userUpdateSuccess: false,
  userUpdateFailed: null,

  userIsAuthorized: false,
  userData: null,
  userPassword: null
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGISTER_REQUEST: {
      return {...state, registerRequest: true}
    }
    case GET_REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: null,
        registerSuccess: true
      }
    }
    case GET_REGISTER_FAILED: {
      return {...state, registerRequest: false, registerFailed: action.error, registerSuccess: false}
    }

    case GET_LOGIN_REQUEST: {
      return {...state, loginRequest: true}
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: null,
        loginSuccess: true,
        logoutSuccess: false
      }
    }
    case GET_LOGIN_FAILED: {
      return {...state, loginRequest: false, loginFailed: action.error, loginSuccess: false}
    }

    case GET_FORGOT_PASSWORD_REQUEST: {
      return {...state, forgotPasswordRequest: true}
    }
    case GET_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: null,
        forgotPasswordSuccess: true
      }
    }
    case GET_FORGOT_PASSWORD_FAILED: {
      return {...state, resetPasswordRequest: false, resetPasswordFailed: action.error, resetPasswordSuccess: false}
    }

    case GET_RESET_PASSWORD_REQUEST: {
      return {...state, resetPasswordRequest: true}
    }
    case GET_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: null,
        resetPasswordSuccess: true
      }
    }
    case GET_RESET_PASSWORD_FAILED: {
      return {...state, resetPasswordRequest: false, resetPasswordFailed: action.error, resetPasswordSuccess: false}
    }

    case GET_LOGOUT_REQUEST: {
      return {...state, logoutRequest: true}
    }
    case GET_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: null,
        logoutSuccess: true
      }
    }
    case GET_LOGOUT_FAILED: {
      return {...state, logoutRequest: false, logoutFailed: action.error, logoutSuccess: false}
    }

    case GET_USER_REQUEST: {
      return {...state, userRequest: true}
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        userFailed: null,
        userSuccess: true
      }
    }
    case GET_USER_FAILED: {
      return {...state, userRequest: false, userFailed: action.error, userSuccess: false}
    }

    case GET_UPDATE_USER_REQUEST: {
      return {...state, userUpdateRequest: true}
    }
    case GET_UPDATE_USER_SUCCESS: {
      return {
        ...state,
        userUpdateRequest: false,
        userUpdateFailed: null,
        userUpdateSuccess: true
      }
    }
    case GET_UPDATE_USER_FAILED: {
      return {...state, userUpdateRequest: false, userUpdateFailed: action.error, userUpdateSuccess: false}
    }

    case USER_IS_AUTHORIZED: {
      return {...state, userIsAuthorized: action.isAuthorized}
    }

    case SET_USER_DATA: {
      return { ...state, userData: action.user }
    }

    case CLEAR_USER_DATA: {
      return { ...state, userData: null }
    }

    case SET_PASSWORD: {
      return {...state, userPassword: action.password}
    }


    default:
      return state
  }
}