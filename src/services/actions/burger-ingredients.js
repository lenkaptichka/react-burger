import { INGREDIENT_API_URL } from '../../constants/constants';
import checkResponse from '../../utils/check-response';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredients = () => {
  return function(dispatch) {
    dispatch({type: GET_INGREDIENTS_REQUEST});

    fetch(`${INGREDIENT_API_URL}/ingredients`)
      .then(checkResponse)
      .then(data => dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: data.data
      }))
      .catch(error => dispatch({
        type: GET_INGREDIENTS_FAILED,
        error
      }))
  }
}