import {
  TLoginActions,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED
} from '../actions/login';
import { initialState, loginReducer } from './login';

const error = 'Error message';

describe('login reducer', () => {
  it('should return the initial state', () => {
    expect(
      loginReducer(undefined, {} as TLoginActions)
    ).toEqual(initialState)
  });

  it('should handle GET_LOGIN_REQUEST', () => {
    expect(loginReducer(initialState, {
      type: GET_LOGIN_REQUEST
    })
    ).toEqual(
      {
        ...initialState,
        loginRequest: true
      }
    )
  });

  it('should handle GET_LOGOUT_SUCCESS', () => {
    expect(
      loginReducer(initialState, {
        type: GET_LOGIN_SUCCESS
      })
    ).toEqual(
      {
        ...initialState,
        loginRequest: false,
        loginFailed: null,
        loginSuccess: true
      }
    )
  });

  it('should handle GET_LOGIN_FAILED', () => {
    expect(loginReducer(initialState, {
      type: GET_LOGIN_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        loginRequest: false,
        loginFailed: error,
        loginSuccess: false
      }
    )
  });
});
