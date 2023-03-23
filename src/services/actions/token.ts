import { INGREDIENT_API_URL } from '../../constants/constants';
import checkResponse from '../../utils/check-response';
import { getCookie, setCookie } from '../../utils/cookie';
import { TServerResponse } from '../../utils/types';

export const GET_REFRESH_TOKEN_REQUEST: 'GET_REFRESH_TOKEN_REQUEST' = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS: 'GET_REFRESH_TOKEN_SUCCESS' = 'GET_REFRESH_TOKEN_SUCCESS'
export const GET_REFRESH_TOKEN_FAILED: 'GET_REFRESH_TOKEN_FAILED' = 'GET_REFRESH_TOKEN_FAILED';

export interface IGetRefreshTokenRequestAction {
  readonly type: typeof GET_REFRESH_TOKEN_REQUEST;
}

export interface IGetRefreshTokenSuccessAction {
  readonly type: typeof GET_REFRESH_TOKEN_SUCCESS;
}

export interface IGetRefreshTokenFailedAction {
  readonly type: typeof GET_REFRESH_TOKEN_FAILED;
  error: null | string;
}

export type TTokenActions = 
  IGetRefreshTokenRequestAction |
  IGetRefreshTokenSuccessAction |
  IGetRefreshTokenFailedAction;

interface IOptions {
  method: 'POST' | 'PATCH' | 'GET';
  headers: {
    'Content-Type': string;
    'Authorization'?: string;
  };
  body?: string;
} 

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

const refreshToken = (): Promise<TRefreshResponse> => {
  return fetch(`${INGREDIENT_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getCookie(' ') })
    })
    .then(checkResponse<TRefreshResponse>);
}

export const fetchWithRefresh = async<T> (url: string, options: IOptions) => {
  try {
    const result = await fetch(url, options);
    return await checkResponse<T>(result);
  } catch (error) {
    if (((error as {message: string}).message === 'jwt expired' ||
      (error as {message: string}).message === 'Token is invalid')) {
      // Обновление токена
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie(
        'accessToken',
        refreshData.accessToken.split('Bearer ')[1],
      );
      setCookie(
        'refreshToken',
        refreshData.refreshToken,
      );

      options.headers.Authorization = refreshData.accessToken;
      // Повторение запроса
      const result = await fetch(url, options);
      return await checkResponse<T>(result);
    } else {
      return Promise.reject(error);
    }
  }
};
