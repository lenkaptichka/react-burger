import { INGREDIENT_API_URL } from '../../constants/constants';
import checkResponse from '../../utils/check-response';
import { getCookie } from '../../utils/cookie';

export const GET_REFRESH_TOKEN_REQUEST = 'GET_REFRESH_TOKEN_REQUEST';
export const GET_REFRESH_TOKEN_SUCCESS = 'GET_REFRESH_TOKEN_SUCCESS'
export const GET_REFRESH_TOKEN_FAILED = 'GET_REFRESH_TOKEN_FAILED';

export const getRefreshToken = async () => {
  return async function (dispatch) {
    dispatch({ type: GET_REFRESH_TOKEN_REQUEST });

    const result = await fetch(`${INGREDIENT_API_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: getCookie('refreshToken') })
    });
    return checkResponse(result);
  }
}
