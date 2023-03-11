import {
  AppDispatch,
  AppThunk,
  IForgotPasswordFormState,
  TServerResponse,
  TResponseError
} from "../../utils/types";
import checkResponse from "../../utils/check-response";
import { INGREDIENT_API_URL } from '../../constants/constants';

export const GET_FORGOT_PASSWORD_REQUEST: 'GET_FORGOT_PASSWORD_REQUEST' = 'GET_FORGOT_PASSWORD_REQUEST';
export const GET_FORGOT_PASSWORD_SUCCESS: 'GET_FORGOT_PASSWORD_SUCCESS' = 'GET_FORGOT_PASSWORD_SUCCESS';
export const GET_FORGOT_PASSWORD_FAILED: 'GET_FORGOT_PASSWORD_FAILED' = 'GET_FORGOT_PASSWORD_FAILED';

export interface IGetForgotPasswordRequestAction {
  readonly type: typeof GET_FORGOT_PASSWORD_REQUEST;
}

export interface IGetForgotPasswordSuccessAction {
  readonly type: typeof GET_FORGOT_PASSWORD_SUCCESS;
}

export interface IGetForgotPasswordFailedAction {
  readonly type: typeof GET_FORGOT_PASSWORD_FAILED;
  error: null | string;
}

export type TForgotPasswordActions = 
  IGetForgotPasswordRequestAction |
  IGetForgotPasswordSuccessAction |
  IGetForgotPasswordFailedAction;
;

type TSendForgotPasswordResponse = TServerResponse<{
  success: boolean;
  message: string;
}>

export const sendForgotPassword = (form: IForgotPasswordFormState): AppThunk => {
  return function(dispatch: AppDispatch) {
    dispatch({type: GET_FORGOT_PASSWORD_REQUEST});

    fetch(`${INGREDIENT_API_URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(checkResponse<TSendForgotPasswordResponse>)
      .then(() => {
        dispatch({type: GET_FORGOT_PASSWORD_SUCCESS});
      })
      // TODO Добавить случай, когда resetPasswordRequest: false ??????? Вопрос
      .catch((error: TResponseError) => dispatch({
        type: GET_FORGOT_PASSWORD_FAILED,
        error: error.message
      }))
  }
}