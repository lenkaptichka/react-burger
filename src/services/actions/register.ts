import {
  AppDispatch,
  AppThunk,
  IRegisterFormState,
  TServerResponse,
  TResponseError
} from '../../utils/types';
import { setCookie } from '../../utils/cookie';
import checkResponse from '../../utils/check-response';
import { INGREDIENT_API_URL, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from '../../constants/constants';

export const GET_REGISTER_REQUEST: 'GET_REGISTER_REQUEST' = 'GET_REGISTER_REQUEST';
export const GET_REGISTER_SUCCESS: 'GET_REGISTER_SUCCESS' = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED: 'GET_REGISTER_FAILED' = 'GET_REGISTER_FAILED';

export interface IGetRegisterRequestAction {
  readonly type: typeof GET_REGISTER_REQUEST;
}

export interface IGetRegisterSuccessAction {
  readonly type: typeof GET_REGISTER_SUCCESS;
}

export interface IGetRegisterFailedAction {
  readonly type: typeof GET_REGISTER_FAILED;
  error: null | string;
}

export type TRegisterActions = 
  IGetRegisterRequestAction |
  IGetRegisterSuccessAction |
  IGetRegisterFailedAction;

interface IUser {
  email: string;
  name: string;
}

type TSendRegisterDataResponse = TServerResponse<{
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}>

export const sendRegisterData = (form: IRegisterFormState): AppThunk => {
  return function(dispatch: AppDispatch) {
    dispatch({type: GET_REGISTER_REQUEST});

    fetch(`${INGREDIENT_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(form)
    })
      .then(checkResponse<TSendRegisterDataResponse>)
      .then(data => {
        dispatch({type: GET_REGISTER_SUCCESS});
        setCookie(
          'accessToken',
          data.accessToken.split('Bearer ')[1],
          // {expires: ACCESS_TOKEN_LIFETIME}
        )
        setCookie(
          'refreshToken',
          data.refreshToken,
          // {expires: REFRESH_TOKEN_LIFETIME}
        )
      })
      .catch((error: TResponseError) => dispatch({
        type: GET_REGISTER_FAILED,
        error: error.message
      }))
  }
}