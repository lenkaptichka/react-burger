import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../actions/burger-constructor';

const initialState = {
  bun: [],
  otherIngredients: []
}

export const selectedIngredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === 'bun') {
        return {...state, bun: [action.ingredient._id]}
      } else {
        return {
          ...state,
          otherIngredients: [...state.otherIngredients,
            {
              _id: action.ingredient._id,
              key: crypto.randomUUID()
            }
          ]
        }
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        otherIngredients: state.otherIngredients
          .filter((item) => item.key !== action.ingredientKey)
      }
    }
    case MOVE_INGREDIENT: {
      const {dragIngredient, dropIngredient} = action;
      const dragIngredientIndex = state.otherIngredients.findIndex(item => item.key === dragIngredient);
      const dropIngredientIndex = state.otherIngredients.findIndex(item => item.key === dropIngredient);
      const newOtherIngredients = [];

      // Если перенос производится от меньшего индекса к большему (перетаскивание вниз)
      if (dragIngredientIndex < dropIngredientIndex) {
        newOtherIngredients.push(...state.otherIngredients.slice(0, dragIngredientIndex),
        ...state.otherIngredients.slice(dragIngredientIndex + 1, dropIngredientIndex + 1),
        ...state.otherIngredients.slice(dragIngredientIndex, dragIngredientIndex + 1),
        ...state.otherIngredients.slice(dropIngredientIndex + 1, state.otherIngredients.length)
      );
        return { ...state, otherIngredients: newOtherIngredients }
        // Если перенос производится от большего индекса к меньшему (перетаскивание наверх)
      } else {
        newOtherIngredients.push(...state.otherIngredients.slice(0, dropIngredientIndex),
          ...state.otherIngredients.slice(dragIngredientIndex, dragIngredientIndex + 1),
          ...state.otherIngredients.slice(dropIngredientIndex, dragIngredientIndex),
          ...state.otherIngredients.slice(dragIngredientIndex + 1, state.otherIngredients.length));

        return { ...state, otherIngredients: newOtherIngredients }

      }
    }
    default:
      return state
  }
}