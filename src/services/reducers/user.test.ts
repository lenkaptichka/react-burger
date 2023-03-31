import {
  TUserActions,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  USER_IS_AUTHORIZED,
  SET_USER_DATA,
  CLEAR_USER_DATA,
  GET_UPDATE_USER_REQUEST,
  GET_UPDATE_USER_SUCCESS,
  GET_UPDATE_USER_FAILED,
  SET_PASSWORD,
  AUTH_CHECKED
} from '../actions/user';
import { userReducer } from './user';

const initialState = {
  userRequest: false,
  userSuccess: false,
  userFailed: null,

  userUpdateRequest: false,
  userUpdateSuccess: false,
  userUpdateFailed: null,

  userIsAuthorized: false,
  userData: null,
  userPassword: null,
  isAuthChecked: false
};
const error = 'Error message';
const userData = {
  email: 'user@email.ru',
  name: 'Сладкий пирожочек'
};
const password = 'password'

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(
      userReducer(undefined, {} as TUserActions)
    ).toEqual(initialState)
  });

  it('should handle GET_USER_REQUEST', () => {
    expect(userReducer(initialState, {type: GET_USER_REQUEST})
    ).toEqual(
      {
        ...initialState,
        userRequest: true
      }
    )
  });

  it('should handle GET_USER_SUCCESS', () => {
    expect(userReducer(initialState, {type: GET_USER_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        userRequest: false,
        userFailed: null,
        userSuccess: true
      }
    )
  });

  it('should handle GET_USER_FAILED', () => {
    expect(userReducer(initialState, {
      type: GET_USER_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        userRequest: false,
        userFailed: error,
        userSuccess: false
      }
    )
  });

  it('should handle GET_USER_FAILED', () => {
    expect(userReducer(initialState, {
      type: GET_USER_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        userRequest: false,
        userFailed: error,
        userSuccess: false
      }
    )
  });

  it('should handle USER_IS_AUTHORIZED', () => {
    expect(userReducer(initialState, {
      type: USER_IS_AUTHORIZED,
      isAuthorized: true
    })
    ).toEqual(
      {
        ...initialState,
        userIsAuthorized: true
      }
    )
  });

  it('should handle SET_USER_DATA', () => {
    expect(userReducer(initialState, {
      type: SET_USER_DATA,
      user: userData
    })
    ).toEqual(
      {
        ...initialState,
        userData: userData
      }
    )
  });

  it('should handle CLEAR_USER_DATA', () => {
    expect(userReducer(initialState, {type: CLEAR_USER_DATA})
    ).toEqual(
      {
        ...initialState,
        userData: null
      }
    )
  });

  it('should handle GET_UPDATE_USER_REQUEST', () => {
    expect(userReducer(initialState, {type: GET_UPDATE_USER_REQUEST})
    ).toEqual(
      {
        ...initialState,
        userUpdateRequest: true
      }
    )
  });

  it('should handle GET_UPDATE_USER_SUCCESS', () => {
    expect(userReducer(initialState, {type: GET_UPDATE_USER_SUCCESS})
    ).toEqual(
      {
        ...initialState,
        userUpdateRequest: false,
        userUpdateFailed: null,
        userUpdateSuccess: true
      }
    )
  });

  it('should handle GET_UPDATE_USER_FAILED', () => {
    expect(userReducer(initialState, {
      type: GET_UPDATE_USER_FAILED,
      error: error
    })
    ).toEqual(
      {
        ...initialState,
        userUpdateRequest: false,
        userUpdateFailed: error,
        userUpdateSuccess: false
      }
    )
  });

  it('should handle SET_PASSWORD', () => {
    expect(userReducer(initialState, {
      type: SET_PASSWORD,
      password: password
    })
    ).toEqual(
      {
        ...initialState,
        userPassword: password
      }
    )
  });

  it('should handle GET_USER_REQUEST', () => {
    expect(userReducer(initialState, {type: AUTH_CHECKED})
    ).toEqual(
      {
        ...initialState,
        isAuthChecked: true
      }
    )
  });
})