export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const addIngredient = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    ingredient
  }
}

export const deleteIngredient = (ingredientKey) => {
  return {
    type: DELETE_INGREDIENT,
    ingredientKey
  }
}

export const moveIngredient = (dragIngredient, dropIngredient) => {
  return {
    type: MOVE_INGREDIENT,
    dragIngredient,
    dropIngredient
  }
}