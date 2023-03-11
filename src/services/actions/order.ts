import { INGREDIENT_API_URL } from '../../constants/constants';
import checkResponse from '../../utils/check-response';
import { getCookie } from '../../utils/cookie';
import {
  AppDispatch,
  AppThunk,
  IIngredient,
  TServerResponse,
  TResponseError
} from '../../utils/types';
import { fetchWithRefresh } from '../actions/token';
import { useDispatch } from 'react-redux';

// const dispatch = useDispatch();

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  orderNumber: number;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
  error: null | string;
}

export type TOrderActions = 
  IGetOrderRequestAction |
  IGetOrderSuccessAction |
  IGetOrderFailedAction;


interface IOwner {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
}

interface IOrder {
  createdAt: string;
  ingredients: Array<IIngredient>;
  name: string;
  number: number;
  owner: IOwner;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
}

type TSendOrderResponse = TServerResponse<{
  name: string;
  order: IOrder;
  success: boolean;
}>

const orderBurger = (ingredients: Array<string>) => {
  console.log('orderBurger')
  return fetchWithRefresh(`${INGREDIENT_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({
        ingredients
      })
    })
    .then((data) => {
      if (data?.success) {
        return data;
      } else {
        console.log('error', Promise.reject(data))
        return Promise.reject(data)
      }
    })
}

export const sendOrder = (ingredients: Array<string>) => (dispatch: AppDispatch) => {
  dispatch({type: GET_ORDER_REQUEST})
  return orderBurger(ingredients).then(data => {
    console.log(data)
    if (data && data.success) {
      dispatch({
        type: GET_ORDER_SUCCESS,
        orderNumber: data.order.number
      });
    } else {
      dispatch({
        type: GET_ORDER_FAILED,
        error: null
      });
    }
  })

}

// export const sendOrder = (ingredients: Array<string>): AppThunk => {
//   console.log('sendOrder')
//   return function(dispatch: AppDispatch) {
//     dispatch({type: GET_ORDER_REQUEST})
    
//     orderBurger(ingredients).then(data => {
//       if (data && data.success) {
//         dispatch({
//           type: GET_ORDER_SUCCESS,
//           orderNumber: data.order.number
//         });
//       } else {
//         dispatch({
//           type: GET_ORDER_FAILED,
//           error: 'error.message'
//         });
//       }
//     })

//   }
// }

// export const sendOrder = (ingredients: Array<string>): AppThunk => {
//   return function(dispatch: AppDispatch) {
//     dispatch({type: GET_ORDER_REQUEST})

//     fetch(`${INGREDIENT_API_URL}/orders`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + getCookie('accessToken')
//       },
//       body: JSON.stringify({
//         ingredients
//       })
//     })
//       .then(checkResponse<TSendOrderResponse>)
//       .then(data => dispatch({
//         type: GET_ORDER_SUCCESS,
//         orderNumber: data.order.number
//       }))
//       .catch((error: TResponseError) => dispatch({
//         type: GET_ORDER_FAILED,
//         error: error.message
//       }))
//   }
// }