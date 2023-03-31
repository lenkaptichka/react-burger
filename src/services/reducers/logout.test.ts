import {
  TLogoutActions,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED
} from '../actions/logout';
import { logoutReducer } from './logout';

const initialState = {
  logoutRequest: false,
  logoutSuccess: false,
  logoutFailed: null
};
const error = 'Error message';

describe('logout reducer', () => {
  it('should return the initial state', () => {
    expect(
      logoutReducer(undefined, {} as TLogoutActions)
    ).toEqual(initialState)
  });

  it('should handle GET_LOGOUT_REQUEST', () => {
    expect(logoutReducer(initialState, {
      type: GET_LOGOUT_REQUEST
    })
    ).toEqual(
      {
        ...initialState,
        logoutRequest: true
      }
    )
  });

  it('should handle GET_LOGOUT_SUCCESS', () => {
    expect(
      logoutReducer(initialState, {
        type: GET_LOGOUT_SUCCESS,
        logoutIsSuccess: true
      })
    ).toEqual(
      {
        ...initialState,
        logoutRequest: false,
        logoutFailed: null,
        logoutSuccess: true
      }
    )
  });

  it('should handle GET_LOGOUT_FAILED', () => {
    expect(logoutReducer(initialState, {
      type: GET_LOGOUT_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        logoutRequest: false,
        logoutFailed: error,
        logoutSuccess: false
      }
    )
  });
});
