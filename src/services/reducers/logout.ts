import {
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  TLogoutActions
} from '../actions/logout';

interface ILogoutState {
  logoutRequest: boolean;
  logoutSuccess: boolean;
  logoutFailed: null | string;
};

const initialState: ILogoutState = {
  logoutRequest: false,
  logoutSuccess: false,
  logoutFailed: null
};

export const logoutReducer = (state: ILogoutState = initialState, action: TLogoutActions): ILogoutState => {
  switch (action.type) {
    case GET_LOGOUT_REQUEST: {
      return {...state, logoutRequest: true}
    }
    case GET_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: null,
        logoutSuccess: true
      }
    }
    case GET_LOGOUT_FAILED: {
      return {...state, logoutRequest: false, logoutFailed: action.error, logoutSuccess: false}
    }
    default:
      return state
  }
}