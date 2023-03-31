import {
  TTokenActions,
  GET_REFRESH_TOKEN_REQUEST,
  GET_REFRESH_TOKEN_SUCCESS,
  GET_REFRESH_TOKEN_FAILED,
} from '../actions/token';
import { tokenReducer } from './token';

const initialState = {
  refreshTokenRequest: false,
  refreshTokenSuccess: false,
  refreshTokenFailed: null,
};
const error = 'Error message';

describe('token reducer', () => {
  it('should return the initial state', () => {
    expect(
      tokenReducer(undefined, {} as TTokenActions)
    ).toEqual(initialState)
  });

  it('should handle GET_REFRESH_TOKEN_REQUEST', () => {
    expect(tokenReducer(initialState, {
      type: GET_REFRESH_TOKEN_REQUEST
    })
    ).toEqual(
      {
        ...initialState,
        refreshTokenRequest: true
      }
    )
  });

  it('should handle GET_REFRESH_TOKEN_SUCCESS', () => {
    expect(
      tokenReducer(initialState, {type: GET_REFRESH_TOKEN_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        refreshTokenRequest: false,
        refreshTokenFailed: null,
        refreshTokenSuccess: true
      }
    )
  });

  it('should handle GET_REFRESH_TOKEN_FAILED', () => {
    expect(tokenReducer(initialState, {
      type: GET_REFRESH_TOKEN_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        refreshTokenRequest: false,
        refreshTokenFailed: error,
        refreshTokenSuccess: false
      }
    )
  });
})