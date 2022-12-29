import { accessTokenLifetime, INGREDIENT_API_URL, refreshLifetime } from "../../constants/constants";
import checkResponse from "../../utils/check-response";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";
import { getRefreshToken } from "./token";

export const GET_REGISTER_REQUEST = 'GET_REGISTER_REQUEST';
export const GET_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILED = 'GET_REGISTER_FAILED';

export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED = 'GET_LOGIN_FAILED';

export const GET_FORGOT_PASSWORD_REQUEST = 'GET_FORGOT_PASSWORD_REQUEST';
export const GET_FORGOT_PASSWORD_SUCCESS = 'GET_FORGOT_PASSWORD_SUCCESS';
export const GET_FORGOT_PASSWORD_FAILED = 'GET_FORGOT_PASSWORD_FAILED';

export const GET_RESET_PASSWORD_REQUEST = 'GET_RESET_PASSWORD_REQUEST';
export const GET_RESET_PASSWORD_SUCCESS = 'GET_RESET_PASSWORD_SUCCESS';
export const GET_RESET_PASSWORD_FAILED = 'GET_RESET_PASSWORD_FAILED';

export const GET_LOGOUT_REQUEST = 'GET_LOGOUT_REQUEST';
export const GET_LOGOUT_SUCCESS = 'GET_LOGOUT_SUCCESS';
export const GET_LOGOUT_FAILED = 'GET_LOGOUT_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const GET_UPDATE_USER_REQUEST = 'GET_UPDATE_USER_REQUEST';
export const GET_UPDATE_USER_SUCCESS = 'GET_UPDATE_USER_SUCCESS';
export const GET_UPDATE_USER_FAILED = 'GET_UPDATE_USER_FAILED';

export const USER_IS_AUTHORIZED = 'USER_IS_AUTHORIZED';
export const SET_PASSWORD = 'SET_PASSWORD';
export const SET_USER_DATA = 'SET_USER_DATA';
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA';

export const sendRegisterData = (form) => {
  return function(dispatch) {
    dispatch({type: GET_REGISTER_REQUEST});

    fetch(`${INGREDIENT_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(checkResponse)
      .then(data => {
        dispatch({type: GET_REGISTER_SUCCESS});
        console.log(JSON.parse(atob(data.accessToken.split('.')[1])))
        setCookie(
          'accessToken',
          data.accessToken.split('Bearer ')[1],
          {expires: accessTokenLifetime}
        )
        setCookie(
          'refreshToken',
          data.refreshToken,
          {expires: refreshLifetime}
        )
        console.log(data);
      })
      .catch(error => dispatch({
        type: GET_REGISTER_FAILED,
        error
      }))
  }
}

export const sendLoginData = (form) => {
  return function(dispatch) {
    dispatch({type: GET_LOGIN_REQUEST});

    fetch(`${INGREDIENT_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify(form)
    })
      .then(checkResponse)
      .then(data => {
        dispatch({type: GET_LOGIN_SUCCESS});
        setCookie(
          'accessToken',
          data.accessToken.split('Bearer ')[1],
          {expires: accessTokenLifetime}
        );
        setCookie(
          'refreshToken',
          data.refreshToken,
          {expires: refreshLifetime}
        );
        dispatch({
          type: USER_IS_AUTHORIZED,
          isAuthorized: true
        });

        dispatch({
          type: SET_USER_DATA,
          user: data.user
        });
        console.log('sendLoginData', data);
      })
      .catch(error => dispatch({
        type: GET_LOGIN_FAILED,
        error
      }))
  }
}

export const sendForgotPassword = (form) => {
  return function(dispatch) {
    dispatch({type: GET_FORGOT_PASSWORD_REQUEST});

    fetch(`${INGREDIENT_API_URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(checkResponse)
      .then(data => {
        dispatch({type: GET_FORGOT_PASSWORD_SUCCESS});
        console.log(data);
      })
      .catch(error => dispatch({
        type: GET_FORGOT_PASSWORD_FAILED,
        error
      }))
  }
}

export const sendResetPassword = (form) => {
  return function(dispatch) {
    dispatch({type: GET_RESET_PASSWORD_REQUEST});

    fetch(`${INGREDIENT_API_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    })
      .then(checkResponse)
      .then(data => {
        dispatch({type: GET_RESET_PASSWORD_SUCCESS});
        console.log(data);
      })
      .catch(error => dispatch({
        type: GET_RESET_PASSWORD_FAILED,
        error
      }))
  }
}

export const logout = () => {
  return function(dispatch) {
    dispatch({type: GET_LOGOUT_REQUEST});

    fetch(`${INGREDIENT_API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: getCookie('refreshToken')})
    })
      .then(checkResponse)
      .then(data => {
        dispatch({type: GET_LOGOUT_SUCCESS});
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch({
          type: USER_IS_AUTHORIZED,
          isAuthorized: false
        });
        dispatch({type: CLEAR_USER_DATA})

        console.log(data);
      })
      .catch(error => dispatch({
        type: GET_LOGOUT_FAILED,
        error
      }))
  }
}

export const getUser = () => {
  console.log('getUser');
  // if (!getCookie('accessToken')) {
  //   console.log('токена нет')
  // }
  return function(dispatch) {
    dispatch({type: GET_USER_REQUEST});

    fetch(`${INGREDIENT_API_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')

      }
    })
      .then(checkResponse)
      .then(data => {
        dispatch({type: GET_USER_SUCCESS});
        dispatch({
          type: USER_IS_AUTHORIZED,
          isAuthorized: true
        });
        dispatch({
          type: SET_USER_DATA,
          user: data.user
        })
        console.log({data})

      })
      .catch(error => 
        dispatch({
        type: GET_USER_FAILED,
        error
      }))
  }
}

export const updateUser = (form) => {
  return function(dispatch) {
    dispatch({type: GET_UPDATE_USER_REQUEST});

    fetch(`${INGREDIENT_API_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify(form)

    })
      .then(checkResponse)
      .then(data => {
        dispatch({
          type: GET_UPDATE_USER_SUCCESS,
          user: data.user
        });
        dispatch({
          type: SET_USER_DATA,
          user: data.user
        });
        console.log('updateUser', {data})
      })
      .catch(error => 
        dispatch({
        type: GET_UPDATE_USER_FAILED,
        error
      }))
  }
} 

// export const getUserWithCheckToken = () => {
//   return function(dispatch) {
//     if (!getCookie('accessToken')) {
//       dispatch(getRefreshToken());
//     } else {
//       dispatch(getUser());     
//     }
//   }
// }