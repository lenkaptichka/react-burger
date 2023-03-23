import {
  GET_RESET_PASSWORD_REQUEST,
  GET_RESET_PASSWORD_SUCCESS,
  GET_RESET_PASSWORD_FAILED,
  TResetPasswordActions
} from '../actions/reset-password';

interface IResetPasswordrState {
  resetPasswordRequest: boolean;
  resetPasswordSuccess: boolean;
  resetPasswordFailed: null | string;
};

const initialState: IResetPasswordrState = {
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: null
};

export const resetPasswordReducer = (state: IResetPasswordrState = initialState, action: TResetPasswordActions): IResetPasswordrState => {
  switch (action.type) {    
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

    default:
      return state
  }
}