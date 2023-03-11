import {
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAILED,
  TRegisterActions
} from '../actions/register';

interface IRegisterState {
  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailed: null | string;
};

const initialState: IRegisterState = {
  registerRequest: false,
  registerSuccess: false,
  registerFailed: null,
};

export const registerReducer = (state = initialState, action: TRegisterActions): IRegisterState => {
  switch (action.type) {
    case GET_REGISTER_REQUEST: {
      return {...state, registerRequest: true}
    }
    case GET_REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: null,
        registerSuccess: true
      }
    }
    case GET_REGISTER_FAILED: {
      return {...state, registerRequest: false, registerFailed: action.error, registerSuccess: false}
    }

    default:
      return state
  }
}
  