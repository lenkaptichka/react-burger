import {
  TRegisterActions,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAILED
} from '../actions/register';
import { registerReducer } from './register';

const initialState = {
  registerRequest: false,
  registerSuccess: false,
  registerFailed: null,
};
const error = 'Error message';

describe('register reducer', () => {
  it('should return the initial state', () => {
    expect(
      registerReducer(undefined, {} as TRegisterActions)
    ).toEqual(initialState)
  });

  it('should handle GET_REGISTER_REQUEST', () => {
    expect(registerReducer(initialState, {
      type: GET_REGISTER_REQUEST
    })
    ).toEqual(
      {
        ...initialState,
        registerRequest: true
      }
    )
  });

  it('should handle GET_REGISTER_SUCCESS', () => {
    expect(
      registerReducer(initialState, {type: GET_REGISTER_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        registerRequest: false,
        registerFailed: null,
        registerSuccess: true
      }
    )
  });

  it('should handle GET_REGISTER_FAILED', () => {
    expect(registerReducer(initialState, {
      type: GET_REGISTER_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        registerRequest: false,
        registerFailed: error,
        registerSuccess: false
      }
    )
  });
})