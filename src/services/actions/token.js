import { INGREDIENT_API_URL, accessTokenLifetime, refreshLifetime } from "../../constants/constants";
import checkResponse from "../../utils/check-response";
import { setCookie, getCookie, deleteCookie } from "../../utils/cookie";
import { getUser } from "./user";

export const GET_REFRESH_TOKEN_REQUEST = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS = 'GET_REFRESH_TOKEN_SUCCESS'
export const GET_REFRESH_TOKEN_FAILED = 'GET_REFRESH_TOKEN_FAILED';


export const getRefreshToken = () => {
  console.log('getRefreshToken');
  return function (dispatch) {
    dispatch({ type: GET_REFRESH_TOKEN_REQUEST });

    fetch(`${INGREDIENT_API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: getCookie('refreshToken') })
    })
      .then(checkResponse)
      .then(data => {
        dispatch({ type: GET_REFRESH_TOKEN_SUCCESS });
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
        );
      })
      .catch(error => dispatch({
        type: GET_REFRESH_TOKEN_FAILED,
        error
      }))
  }
}