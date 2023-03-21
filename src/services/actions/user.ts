import { getCookie } from '../../utils/cookie';
import { AppDispatch, IEditUserDataFormState, IUserData } from '../../utils/types';
import { getUserApi, updateUserApi } from '../../utils/api';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const GET_UPDATE_USER_REQUEST: 'GET_UPDATE_USER_REQUEST' = 'GET_UPDATE_USER_REQUEST';
export const GET_UPDATE_USER_SUCCESS: 'GET_UPDATE_USER_SUCCESS' = 'GET_UPDATE_USER_SUCCESS';
export const GET_UPDATE_USER_FAILED: 'GET_UPDATE_USER_FAILED' = 'GET_UPDATE_USER_FAILED';

export const USER_IS_AUTHORIZED: 'USER_IS_AUTHORIZED' = 'USER_IS_AUTHORIZED';
export const SET_PASSWORD: 'SET_PASSWORD' = 'SET_PASSWORD';
export const SET_USER_DATA: 'SET_USER_DATA' = 'SET_USER_DATA';
export const CLEAR_USER_DATA: 'CLEAR_USER_DATA' = 'CLEAR_USER_DATA';
export const AUTH_CHECKED: 'AUTH_CHECKED' = 'AUTH_CHECKED';

export interface IGetUserRequestAction {readonly type: typeof GET_USER_REQUEST}

export interface IGetUserSuccessAction {readonly type: typeof GET_USER_SUCCESS}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
  error: null | string;
}

export interface IGetUpdateUserRequestAction {readonly type: typeof GET_UPDATE_USER_REQUEST}

export interface IGeUpdatetUserSuccessAction {readonly type: typeof GET_UPDATE_USER_SUCCESS}

export interface IGetUpdateUserFailedAction {
  readonly type: typeof GET_UPDATE_USER_FAILED;
  error: null | string;
}

export interface IUserIsAuthorizedAction {
  readonly type: typeof USER_IS_AUTHORIZED;
  isAuthorized: boolean;
}

export interface SetPasswordAction {
  readonly type: typeof SET_PASSWORD;
  password: string;
}

export interface ISetUserDataAction {
  readonly type: typeof SET_USER_DATA;
  user: IUserData
}

export interface IClearUserDataAction {readonly type: typeof CLEAR_USER_DATA}

export interface IAuthIsCheckedAction {readonly type: typeof AUTH_CHECKED}

export type TUserActions = 
  IGetUserRequestAction |
  IGetUserSuccessAction |
  IGetUserFailedAction |
  IGetUpdateUserRequestAction |
  IGeUpdatetUserSuccessAction |
  IGetUpdateUserFailedAction |
  IUserIsAuthorizedAction |
  SetPasswordAction |
  ISetUserDataAction |
  IClearUserDataAction |
  IAuthIsCheckedAction;

export const checkUserAuth = () => (dispatch: AppDispatch) => {
  console.log('checkUserAuth');
  if (getCookie('accessToken')) {
    dispatch(getUser())
    .finally(() => {
        dispatch({ type: AUTH_CHECKED });
      });
  } else {
    dispatch({type: AUTH_CHECKED});
  }
}

export const getUser = () => (dispatch: AppDispatch) => {
  console.log('getUser');
  dispatch({type: GET_USER_REQUEST});
  
  return getUserApi()
    .then(data => {
      console.log('user data', data)
      if (data && data.success) {
        dispatch({type: GET_USER_SUCCESS});
        dispatch({
          type: USER_IS_AUTHORIZED,
          isAuthorized: true
        });
        dispatch({
          type: SET_USER_DATA,
          user: data.user
        })
      } else {
        dispatch({
          type: GET_USER_FAILED,
          error: 'Запрос не отправлен'
        });
      }
    })
}

export const updateUser = (form: IEditUserDataFormState) => (dispatch: AppDispatch) => {
    dispatch({type: GET_UPDATE_USER_REQUEST});

    return updateUserApi(form)
      .then(data => {
        if (data && data.success) {
          dispatch({type: GET_UPDATE_USER_SUCCESS});
        dispatch({
            type: SET_USER_DATA,
            user: data.user
          });
        } else {
          dispatch({
            type: GET_UPDATE_USER_FAILED,
            error: 'Запрос не отправлен'
          });
        }
      })

};
