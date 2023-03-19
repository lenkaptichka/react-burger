import {
  GET_REFRESH_TOKEN_REQUEST,
  GET_REFRESH_TOKEN_SUCCESS,
  GET_REFRESH_TOKEN_FAILED
} from '../actions/token';

const initialState = {
  refreshTokenRequest: false,
  refreshTokenSuccess: false,
  refreshTokenFailed: null,
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REFRESH_TOKEN_REQUEST: {
      return {...state, refreshTokenRequest: true}
    }
    case GET_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshTokenRequest: false,
        refreshTokenFailed: null,
        refreshTokenSuccess: true
      }
    }
    case GET_REFRESH_TOKEN_FAILED: {
      return {...state, refreshTokenRequest: false, refreshTokenFailed: action.error.message, refreshTokenSuccess: false}
    }

    default:
      return state
  }
}
