import { ACCESS_TOKEN_LIFETIME, INGREDIENT_API_URL, REFRESH_TOKEN_LIFETIME } from '../../constants/constants';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import {
  fetchWithRefresh,
  GET_REFRESH_TOKEN_SUCCESS,
  GET_REFRESH_TOKEN_REQUEST,
  GET_REFRESH_TOKEN_FAILED
} from './token'
import { AppDispatch, AppThunk, IEditUserDataFormState, IUserData } from '../../utils/types';
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
  // console.log('checkUserAuth');
  if (getCookie('accessToken')) {
    dispatch(getUser())
    .finally(() => {
        dispatch({ type: AUTH_CHECKED });
      });
  } else {
    dispatch({type: AUTH_CHECKED});
  }
}

// export const sendRegisterData = (form) => {
//   return function(dispatch) {
//     dispatch({type: GET_REGISTER_REQUEST});

//     fetch(`${INGREDIENT_API_URL}/auth/register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify(form)
//     })
//       .then(checkResponse)
//       .then(data => {
//         dispatch({type: GET_REGISTER_SUCCESS});
//         setCookie(
//           'accessToken',
//           data.accessToken.split('Bearer ')[1],
//           // {expires: ACCESS_TOKEN_LIFETIME}
//         )
//         setCookie(
//           'refreshToken',
//           data.refreshToken,
//           // {expires: REFRESH_TOKEN_LIFETIME}
//         )
//       })
//       .catch(error => dispatch({
//         type: GET_REGISTER_FAILED,
//         error
//       }))
//   }
// }

// export const sendLoginData = (form) => {
//   return function(dispatch) {
//     dispatch({type: GET_LOGIN_REQUEST});
//     fetch(`${INGREDIENT_API_URL}/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(form)
//     })
//       .then(checkResponse)
//       .then(data => {
//         dispatch({type: GET_LOGIN_SUCCESS});
//         setCookie(
//           'accessToken',
//           data.accessToken.split('Bearer ')[1],
//           // {expires: ACCESS_TOKEN_LIFETIME}
//         );
//         setCookie(
//           'refreshToken',
//           data.refreshToken,
//           // {expires: REFRESH_TOKEN_LIFETIME}
//         );
//         dispatch({
//           type: USER_IS_AUTHORIZED,
//           isAuthorized: true
//         });

//         dispatch({
//           type: SET_USER_DATA,
//           user: data.user
//         });
//       })
//       .catch(error => dispatch({
//         type: GET_LOGIN_FAILED,
//         error
//       }))
//   }
// }

// export const sendForgotPassword = (form) => {
//   return function(dispatch) {
//     dispatch({type: GET_FORGOT_PASSWORD_REQUEST});

//     fetch(`${INGREDIENT_API_URL}/password-reset`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(form)
//     })
//       .then(checkResponse)
//       .then(() => {
//         dispatch({type: GET_FORGOT_PASSWORD_SUCCESS});
//       })
//       .catch(error => dispatch({
//         type: GET_FORGOT_PASSWORD_FAILED,
//         error
//       }))
//   }
// }

// export const sendResetPassword = (form) => {
//   return function(dispatch) {
//     dispatch({type: GET_RESET_PASSWORD_REQUEST});

//     fetch(`${INGREDIENT_API_URL}/password-reset/reset`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(form)
//     })
//       .then(checkResponse)
//       .then(() => {
//         dispatch({type: GET_RESET_PASSWORD_SUCCESS});
//       })
//       .catch(error => dispatch({
//         type: GET_RESET_PASSWORD_FAILED,
//         error
//       }))
//   }
// }

// export const logout = () => {
//   return function(dispatch) {
//     dispatch({type: GET_LOGOUT_REQUEST});

//     fetch(`${INGREDIENT_API_URL}/auth/logout`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({token: getCookie('refreshToken')})
//     })
//       .then(checkResponse)
//       .then(() => {
//         dispatch({type: GET_LOGOUT_SUCCESS});
//         deleteCookie('accessToken');
//         deleteCookie('refreshToken');
//         dispatch({
//           type: USER_IS_AUTHORIZED,
//           isAuthorized: false
//         });
//         dispatch({type: CLEAR_USER_DATA});
//       })
//       .catch(error => dispatch({
//         type: GET_LOGOUT_FAILED,
//         error
//       }))
//   }
// }

// const getUserRequest = async () => {
//   const res = await fetch(`${INGREDIENT_API_URL}/auth/user`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + getCookie('accessToken')
//     }
//   });

//   return checkResponse(res);
// };

// export const patchUpdateUser = async (form) => {
//   const res = await fetch(`${INGREDIENT_API_URL}/auth/user`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + getCookie('accessToken')
//     },
//     body: JSON.stringify(form)
//   });

//   return checkResponse(res); 
// }


export const getUser = () => (dispatch: AppDispatch) => {
  dispatch({type: GET_USER_REQUEST});
  
  return getUserApi()
    .then(data => {
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
          // TODO Поправить
          error: 'error.message'
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
            // TODO Поправить
            error: 'error.message'
          });
        }
      })

};


// export const getUser = () => {
//   return function(dispatch) {
//     dispatch({type: GET_USER_REQUEST});
    
//     fetchWithRefresh(`${INGREDIENT_API_URL}/auth/user`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + getCookie('accessToken')
//       }
//     }).then(data => {
//       console.log({data});
//       if (data.success) {
//         dispatch({type: GET_USER_SUCCESS});
//         dispatch({
//           type: USER_IS_AUTHORIZED,
//           isAuthorized: true
//         });
//         dispatch({
//           type: SET_USER_DATA,
//           user: data.user
//         })
//       } else {
//         dispatch({
//           type: GET_USER_FAILED,
//           error: 'error.message'
//         });
//       }
//     })

//   }
// }

// export const getUserItWorks = () => {
//   return fetchWithRefresh(`${INGREDIENT_API_URL}/auth/user`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + getCookie('accessToken')
//     }
//   }).then(data => console.log({data}))
// }



// export const getUserTest = () => {
//   return async function (dispatch) {
//     dispatch({type: GET_USER_REQUEST});
//     try {
//       const res = await getUserRequest();
      
//       if (res?.success) {
//         dispatch({type: GET_USER_SUCCESS});
//         dispatch({
//           type: USER_IS_AUTHORIZED,
//           isAuthorized: true
//         });
//         dispatch({
//           type: SET_USER_DATA,
//           user: res.user
//         })
//       }
//     } catch (error) {
//       try {
//         // Есди проблема с токеном
//         if (error.message === 'jwt expired' || error.message === 'Token is invalid') {
//           dispatch({ type: GET_REFRESH_TOKEN_REQUEST });
//           const tokenResult = await getRefreshToken();
          
//           if (tokenResult.success) {
//             dispatch({ type: GET_REFRESH_TOKEN_SUCCESS });
            
//             setCookie(
//               'accessToken',
//               tokenResult.accessToken.split('Bearer ')[1],
//               // {expires: ACCESS_TOKEN_LIFETIME}
//             )
//             setCookie(
//               'refreshToken',
//               setCookie.refreshToken,
//               // {expires: REFRESH_TOKEN_LIFETIME}
//             );

//             // Новый запрос пользователя
//             const res = await getUserRequest();
//             if (res?.success) {
//               dispatch({type: GET_USER_SUCCESS});
//               dispatch({
//                 type: USER_IS_AUTHORIZED,
//                 isAuthorized: true
//               });
//               dispatch({
//                 type: SET_USER_DATA,
//                 user: res.user
//               })
//             } else {
//               return Promise.reject(error);
//             }         
//           } else {
//             return Promise.reject(error);
//           }
//         }
//       } catch(error) {
//         dispatch({
//           type: GET_USER_FAILED,
//           error
//         });
//         dispatch({
//           type: GET_REFRESH_TOKEN_FAILED,
//           error
//         })
//       }
//     }
//   }
// };

// export const updateUser = (form) => {
//   return async function (dispatch) {
//     dispatch({type: GET_USER_REQUEST});
//     try {
//       const res = await patchUpdateUser(form);
      
//       if (res?.success) {
//         dispatch({type: GET_UPDATE_USER_SUCCESS});
//         dispatch({
//           type: SET_USER_DATA,
//           user: res.user
//         });
//       }
//     } catch (error) {
//       try {
//         // Есди проблема с токеном
//         if (error.message === 'jwt expired' || error.message === 'Token is invalid') {
//           dispatch({ type: GET_REFRESH_TOKEN_REQUEST });
//           const tokenResult = await getRefreshToken();
          
//           if (tokenResult.success) {
//             dispatch({ type: GET_REFRESH_TOKEN_SUCCESS });
            
//             setCookie(
//               'accessToken',
//               tokenResult.accessToken.split('Bearer ')[1],
//               // {expires: ACCESS_TOKEN_LIFETIME}
//             )
//             setCookie(
//               'refreshToken',
//               setCookie.refreshToken,
//               // {expires: REFRESH_TOKEN_LIFETIME}
//             );

//             // Новый запрос на обновление данных пользователя
//             const res = await patchUpdateUser(form);
//             if (res?.success) {
//               dispatch({type: GET_UPDATE_USER_SUCCESS});
//               dispatch({
//                 type: SET_USER_DATA,
//                 user: res.user
//               });
//             } else {
//               return Promise.reject(error);
//             }         
//           } else {
//             return Promise.reject(error);
//           }
//         }
//       } catch(error) {
//         dispatch({
//           type: GET_UPDATE_USER_FAILED,
//           error
//         });
//         dispatch({
//           type: GET_REFRESH_TOKEN_FAILED,
//           error
//         })
//       }
//     }
//   }
// };
