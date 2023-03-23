import {
  GET_REFRESH_TOKEN_REQUEST,
  GET_REFRESH_TOKEN_SUCCESS,
  GET_REFRESH_TOKEN_FAILED,
  TTokenActions
} from '../actions/token';

interface ITokenState {
  refreshTokenRequest: boolean;
  refreshTokenSuccess: boolean;
  refreshTokenFailed: null | string;
};

const initialState: ITokenState = {
  refreshTokenRequest: false,
  refreshTokenSuccess: false,
  refreshTokenFailed: null,
};

export const tokenReducer = (state = initialState, action: TTokenActions): ITokenState => {
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
      return {...state, refreshTokenRequest: false, refreshTokenFailed: action.error, refreshTokenSuccess: false}
    }

    default:
      return state
  }
}
