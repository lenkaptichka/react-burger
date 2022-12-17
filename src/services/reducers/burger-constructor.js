import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../actions/burger-constructor';

const initialState = {
  bun: [],
  otherItems: []
}

export const selectedIngredientsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT: {
      if (action.ingredient.type === 'bun') {
        return {...state, bun: [action.ingredient._id]}
      } else {
        return {
          ...state,
          otherItems: [...state.otherItems,
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
        otherItems: state.otherItems
          .filter((item) => item.key !== action.ingredientKey)
      }
    }
    case MOVE_INGREDIENT: {
      const {dragIngredient, dropIngredient} = action;
      const dragIndex = state.otherItems.findIndex(item => item.key === dragIngredient);
      const dropIndex = state.otherItems.findIndex(item => item.key === dropIngredient);
      const newOtherItems = [];

      // Если перенос производится от меньшего индекса к большему (перетаскивание вниз)
      if (dragIndex < dropIndex) {
        newOtherItems.push(...state.otherItems.slice(0, dragIndex),
        ...state.otherItems.slice(dragIndex + 1, dropIndex + 1),
        ...state.otherItems.slice(dragIndex, dragIndex + 1),
        ...state.otherItems.slice(dropIndex + 1, state.otherItems.length)
      );
        return { ...state, otherItems: newOtherItems }
        // Если перенос производится от большего индекса к меньшему (перетаскивание наверх)
      } else {
        newOtherItems.push(...state.otherItems.slice(0, dropIndex),
          ...state.otherItems.slice(dragIndex, dragIndex + 1),
          ...state.otherItems.slice(dropIndex, dragIndex),
          ...state.otherItems.slice(dragIndex + 1, state.otherItems.length));

        return { ...state, otherItems: newOtherItems }
      }
    }
    default:
      return state
  }
}