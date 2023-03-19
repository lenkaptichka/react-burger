import { INGREDIENT_API_URL } from '../../constants/constants';
import checkResponse from '../../utils/check-response';
import { getCookie, setCookie } from '../../utils/cookie';
import { TServerResponse } from '../../utils/types';

export const GET_REFRESH_TOKEN_REQUEST = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS = 'GET_REFRESH_TOKEN_SUCCESS'
export const GET_REFRESH_TOKEN_FAILED = 'GET_REFRESH_TOKEN_FAILED';

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
  console.log('запуск функции refreshToken')
  return fetch(`${INGREDIENT_API_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: getCookie('refreshToken') })
    })
    .then(checkResponse<TRefreshResponse>);
}

export const fetchWithRefresh = async<T> (url: string, options: IOptions) => {
  console.log('fetchWithRefresh')
  try {
    const result = await fetch(url, options);
    return await checkResponse<T>(result);
  } catch (error) {
    if (error instanceof Error && (error.message === 'jwt expired' || error.message === 'Token is invalid')) {
      // Обновление токена
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        console.log({refreshData })
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

// export const fetchWithRefresh = async (url, options) => {
//   try {
//     const result = await fetch(url, options);
//     return await checkResponse(result);
//   } catch (error) {
//     if (error.message === 'jwt expired' || error.message === 'Token is invalid') {
//       const refreshData = await refreshToken(); //обновляем токен
//       if (!refreshData.success) {
//         return Promise.reject(refreshData);
//       }
//       setCookie(
//         'accessToken',
//         refreshData.accessToken.split('Bearer ')[1],
//         {expires: ACCESS_TOKEN_LIFETIME}
//       );
//       setCookie(
//         'refreshToken',
//         refreshData.refreshToken,
//         {expires: REFRESH_TOKEN_LIFETIME}
//       );
//       // localStorage.setItem("refreshToken", refreshData.refreshToken);
//       // setCookie("accessToken", refreshData.accessToken);
//       options.headers.authorization = refreshData.accessToken;
//       const result = await fetch(url, options); //повторяем запрос
//       return await checkResponse(result);
//     } else {
//       return Promise.reject(error);
//     }
//   }
// };

// export const getRefreshToken = async () => {
//   return async function (dispatch) {
//     dispatch({ type: GET_REFRESH_TOKEN_REQUEST });

//     const result = await fetch(`${INGREDIENT_API_URL}/auth/token`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ token: getCookie('refreshToken') })
//     });
//     return checkResponse(result);
//   }
// }


// const checkReponse = (res) => {
//   return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
// };

// export const refreshTokenEx = () => {
//   return fetch(`${BURGER_API_URL}/auth/token`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json;charset=utf-8",
//     },
//     body: JSON.stringify({
//       token: localStorage.getItem("refreshToken"),
//     }),
//   }).then(checkReponse);
// };

// export const fetchWithRefresh = async (url, options) => {
//   try {
//     const res = await fetch(url, options);
//     return await checkReponse(res);
//   } catch (err) {
//     if (err.message === "jwt expired") {
//       const refreshData = await refreshToken(); //обновляем токен
//       if (!refreshData.success) {
//         return Promise.reject(refreshData);
//       }
//       localStorage.setItem("refreshToken", refreshData.refreshToken);
//       setCookie("accessToken", refreshData.accessToken);
//       options.headers.authorization = refreshData.accessToken;
//       const res = await fetch(url, options); //повторяем запрос
//       return await checkReponse(res);
//     } else {
//       return Promise.reject(err);
//     }
//   }
// };