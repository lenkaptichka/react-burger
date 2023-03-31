import {
  TResetPasswordActions,
  GET_RESET_PASSWORD_REQUEST,
  GET_RESET_PASSWORD_SUCCESS,
  GET_RESET_PASSWORD_FAILED
} from '../actions/reset-password';
import { resetPasswordReducer } from './reset-password';

const initialState = {
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordFailed: null
};
const error = 'Error message';

describe('reset password reducer', () => {
  it('should return the initial state', () => {
    expect(
      resetPasswordReducer(undefined, {} as TResetPasswordActions)
    ).toEqual(initialState)
  });

  it('should handle GET_RESET_PASSWORD_REQUEST', () => {
    expect(resetPasswordReducer(initialState, {
      type: GET_RESET_PASSWORD_REQUEST
    })
    ).toEqual(
      {
        ...initialState,
        resetPasswordRequest: true
      }
    )
  });

  it('should handle GET_RESET_PASSWORD_SUCCESS', () => {
    expect(
      resetPasswordReducer(initialState, {type: GET_RESET_PASSWORD_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        resetPasswordRequest: false,
        resetPasswordFailed: null,
        resetPasswordSuccess: true
      }
    )
  });

  it('should handle GET_RESET_PASSWORD_FAILED', () => {
    expect(resetPasswordReducer(initialState, {
      type: GET_RESET_PASSWORD_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        resetPasswordRequest: false,
        resetPasswordFailed: error,
        resetPasswordSuccess: false
      }
    )
  });
})