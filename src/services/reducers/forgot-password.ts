import {
  GET_FORGOT_PASSWORD_REQUEST,
  GET_FORGOT_PASSWORD_SUCCESS,
  GET_FORGOT_PASSWORD_FAILED,
  TForgotPasswordActions
} from '../actions/forgot-password';

interface IForgotPasswordrState {
  forgotPasswordRequest: boolean;
  forgotPasswordSuccess: boolean;
  forgotPasswordFailed: null | string;
};

export const initialState: IForgotPasswordrState = {
  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: null 
};

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordActions): IForgotPasswordrState => {
  switch (action.type) {
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
      return {...state, forgotPasswordRequest: false, forgotPasswordFailed: action.error, forgotPasswordSuccess: false}
    }

    default:
      return state
  }
}
