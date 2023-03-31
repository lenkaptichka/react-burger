import {
  TForgotPasswordActions,
  GET_FORGOT_PASSWORD_REQUEST,
  GET_FORGOT_PASSWORD_SUCCESS,
  GET_FORGOT_PASSWORD_FAILED
} from '../actions/forgot-password';
import { forgotPasswordReducer } from './forgot-password';

const initialState = {
  forgotPasswordRequest: false,
  forgotPasswordSuccess: false,
  forgotPasswordFailed: null 
};
const error = 'Error message';

describe('forgot password reducer', () => {
  it('should return the initial state', () => {
    expect(
      forgotPasswordReducer(undefined, {} as TForgotPasswordActions)
    ).toEqual(initialState)
  });

  it('should handle GET_FORGOT_PASSWORD_REQUEST', () => {
    expect(forgotPasswordReducer(initialState, {
      type: GET_FORGOT_PASSWORD_REQUEST
    })
    ).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: true
      }
    )
  });

  it('should handle GET_FORGOT_PASSWORD_SUCCESS', () => {
    expect(
      forgotPasswordReducer(initialState, {type: GET_FORGOT_PASSWORD_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: false,
        forgotPasswordFailed: null,
        forgotPasswordSuccess: true
      }
    )
  });

  it('should handle GET_FORGOT_PASSWORD_FAILED', () => {
    expect(forgotPasswordReducer(initialState, {
      type: GET_FORGOT_PASSWORD_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        forgotPasswordRequest: false,
        forgotPasswordFailed: error,
        forgotPasswordSuccess: false
      }
    )
  });
})