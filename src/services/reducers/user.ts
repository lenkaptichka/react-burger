import { IUserData } from '../../utils/types';
import {
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
  AUTH_CHECKED,
  TUserActions
} from '../actions/user';

interface IUserState {
  userRequest: boolean;
  userSuccess: boolean;
  userFailed: null | string;

  userUpdateRequest: boolean;
  userUpdateSuccess: boolean;
  userUpdateFailed: null | string;

  userIsAuthorized: boolean;
  userData: null | IUserData;
  userPassword: null | string;
  isAuthChecked: boolean;
}

export const initialState = {
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
}

export const userReducer = (state: IUserState = initialState, action: TUserActions): IUserState  => {
  switch (action.type) {
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

    case AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true
      }
    }

    default:
      return state
  }
}