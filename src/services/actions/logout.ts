import {
  AppDispatch,
  AppThunk,
  TServerResponse,
  TResponseError
} from '../../utils/types';
import checkResponse from '../../utils/check-response';
import { INGREDIENT_API_URL } from '../../constants/constants';
import { deleteCookie, getCookie } from '../../utils/cookie';
import { USER_IS_AUTHORIZED, CLEAR_USER_DATA } from './user';

export const GET_LOGOUT_REQUEST: 'GET_LOGOUT_REQUEST' = 'GET_LOGOUT_REQUEST';
export const GET_LOGOUT_SUCCESS: 'GET_LOGOUT_SUCCESS' = 'GET_LOGOUT_SUCCESS';
export const GET_LOGOUT_FAILED: 'GET_LOGOUT_FAILED' = 'GET_LOGOUT_FAILED';

export interface IGetLogoutRequestAction {
  readonly type: typeof GET_LOGOUT_REQUEST;
}

export interface IGetLogoutSuccessAction {
  readonly type: typeof GET_LOGOUT_SUCCESS;
  logoutIsSuccess: boolean;
}

export interface IGetLogoutFailedAction {
  readonly type: typeof GET_LOGOUT_FAILED;
  error: null | string;
}

export type TLogoutActions = 
  IGetLogoutRequestAction |
  IGetLogoutSuccessAction |
  IGetLogoutFailedAction;

type TLogoutResponse = TServerResponse<{
  success: boolean;
  message: string;
}>

export const logout = (): AppThunk => {
  return function(dispatch: AppDispatch) {
    dispatch({type: GET_LOGOUT_REQUEST});

    fetch(`${INGREDIENT_API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: getCookie('refreshToken')})
    })
      .then(checkResponse<TLogoutResponse>)
      .then(() => {
        dispatch({
          type: GET_LOGOUT_SUCCESS,
          logoutIsSuccess: true
        });
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch({
          type: USER_IS_AUTHORIZED,
          isAuthorized: false
        });
        dispatch({type: CLEAR_USER_DATA});
      })
      .catch((error: TResponseError) => dispatch({
        type: GET_LOGOUT_FAILED,
        error: error.message
      }))
  }
}