export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const addIngredient = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    ingredient
  }
}

export const deleteIngredient = (ingredientIndex) => {
  return {
    type: DELETE_INGREDIENT,
    ingredientIndex
  }
}