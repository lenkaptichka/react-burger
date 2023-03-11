
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import {
  AppDispatch,
  AppThunk,
  IRegisterFormState,
  ILoginFormState,
  TServerResponse,
  TResponseError
} from '../../utils/types';
import { ACCESS_TOKEN_LIFETIME, INGREDIENT_API_URL, REFRESH_TOKEN_LIFETIME } from '../../constants/constants';
import checkResponse from '../../utils/check-response';
import { USER_IS_AUTHORIZED, SET_USER_DATA } from './user';
import { GET_LOGOUT_SUCCESS } from './logout';

export const GET_LOGIN_REQUEST: 'GET_LOGIN_REQUEST' = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS: 'GET_LOGIN_SUCCESS' = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED: 'GET_LOGIN_FAILED' = 'GET_LOGIN_FAILED';

export interface IGetLoginRequestAction {
  readonly type: typeof GET_LOGIN_REQUEST;
}

export interface IGetLoginSuccessAction {
  readonly type: typeof GET_LOGIN_SUCCESS;
}

export interface IGetLoginFailedAction {
  readonly type: typeof GET_LOGIN_FAILED;
  error: null | string;
}

export type TLoginActions = 
  IGetLoginRequestAction |
  IGetLoginSuccessAction |
  IGetLoginFailedAction;

interface IUser {
  email: string;
  name: string;
}

type TSendLoginDataResponse = TServerResponse<{
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}>

type TError = {
  message: string;
}

export const sendLoginData = (form: ILoginFormState): AppThunk => {
  return function(dispatch: AppDispatch) {
    dispatch({type: GET_LOGIN_REQUEST});
    fetch(`${INGREDIENT_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(checkResponse<TSendLoginDataResponse>)
      .then(data => {
        dispatch({type: GET_LOGIN_SUCCESS});
        setCookie(
          'accessToken',
          data.accessToken.split('Bearer ')[1],
          // {expires: ACCESS_TOKEN_LIFETIME}
        );
        setCookie(
          'refreshToken',
          data.refreshToken,
          // {expires: REFRESH_TOKEN_LIFETIME}
        );
        dispatch({
          type: USER_IS_AUTHORIZED,
          isAuthorized: true
        });

        dispatch({
          type: SET_USER_DATA,
          user: data.user
        });
// TODO Исправить экшен на правильный (добавить поле logoutIsSuccess)
        dispatch({
          type: GET_LOGOUT_SUCCESS,
          logoutIsSuccess: false
        });
      })
      .catch(error => dispatch({
        type: GET_LOGIN_FAILED,
        error: error.message
      }))
  }
}