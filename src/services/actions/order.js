import { INGREDIENT_API_URL } from "../../constants/constants";
import checkResponse from "../../utils/check-response";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const sendOrder = (ingredients) => {
  return function(dispatch) {
    dispatch({type: GET_ORDER_REQUEST})

    fetch(`${INGREDIENT_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients
      })
    })
      .then(checkResponse)
      .then(data => dispatch({
        type: GET_ORDER_SUCCESS,
        orderNumber: data.order.number
      }))
      .catch(error => dispatch({
        type: GET_ORDER_FAILED,
        error
      }))
  }
}