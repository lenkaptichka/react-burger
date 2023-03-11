import {
  AppDispatch,
  AppThunk,
  IResetPasswordFormState,
  TServerResponse,
  TResponseError
} from '../../utils/types';
import checkResponse from "../../utils/check-response";
import { INGREDIENT_API_URL } from '../../constants/constants';

export const GET_RESET_PASSWORD_REQUEST: 'GET_RESET_PASSWORD_REQUEST' = 'GET_RESET_PASSWORD_REQUEST';
export const GET_RESET_PASSWORD_SUCCESS: 'GET_RESET_PASSWORD_SUCCESS' = 'GET_RESET_PASSWORD_SUCCESS';
export const GET_RESET_PASSWORD_FAILED: 'GET_RESET_PASSWORD_FAILED' = 'GET_RESET_PASSWORD_FAILED';

export interface IGetResetPasswordRequestAction {
  readonly type: typeof GET_RESET_PASSWORD_REQUEST;
}

export interface IGetResetPasswordSuccessAction {
  readonly type: typeof GET_RESET_PASSWORD_SUCCESS;
}

export interface IGetResetPasswordFailedAction {
  readonly type: typeof GET_RESET_PASSWORD_FAILED;
  error: null | string;
}

export type TResetPasswordActions = 
  IGetResetPasswordRequestAction |
  IGetResetPasswordSuccessAction |
  IGetResetPasswordFailedAction;

type TSendResetPasswordResponse = TServerResponse<{
  success: boolean;
  message: string;
}>

export const sendResetPassword = (form: IResetPasswordFormState): AppThunk => {
  return function(dispatch: AppDispatch) {
    dispatch({type: GET_RESET_PASSWORD_REQUEST});

    fetch(`${INGREDIENT_API_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(checkResponse<TSendResetPasswordResponse>)
      .then(() => {
        dispatch({type: GET_RESET_PASSWORD_SUCCESS});
      })
      .catch((error: TResponseError) => dispatch({
        type: GET_RESET_PASSWORD_FAILED,
        error: error.message
      }))
  }
}