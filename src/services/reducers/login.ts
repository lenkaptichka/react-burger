import {
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  TLoginActions
} from '../actions/login';

interface ILoginState {
  loginRequest: boolean;
  loginSuccess: boolean;
  loginFailed: null | string;
};

const initialState: ILoginState = {
  loginRequest: false,
  loginSuccess: false,
  loginFailed: null
};

export const loginReducer = (state = initialState, action: TLoginActions): ILoginState => {
  switch (action.type) {
    case GET_LOGIN_REQUEST: {
      return {...state, loginRequest: true}
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: null,
        loginSuccess: true
      }
    }
    case GET_LOGIN_FAILED: {
      return {...state, loginRequest: false, loginFailed: action.error, loginSuccess: false}
    }

    default:
      return state
  }
}