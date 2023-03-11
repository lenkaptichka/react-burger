import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  MOVE_INGREDIENT,
  TBurgerConstructorActions
} from '../actions/burger-constructor';

interface IOtherItems {
  _id: string;
  key: string;
}

interface IBurgerConstructorState {
  bun: Array<string>;
  otherItems: Array<IOtherItems>
}

const initialState: IBurgerConstructorState = {
  bun: [],
  otherItems: []
};

export const selectedIngredientsReducer = (state = initialState, action: TBurgerConstructorActions): IBurgerConstructorState => {
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

      const minIndex = Math.min(dragIndex, dropIndex);
      const maxIndex = Math.max(dragIndex, dropIndex);

      newOtherItems.push(...state.otherItems.slice(0, minIndex));

      dragIndex < dropIndex ?
        newOtherItems.push(...state.otherItems.slice(dragIndex + 1, dropIndex + 1), state.otherItems[dragIndex]) :
        newOtherItems.push(state.otherItems[dragIndex], ...state.otherItems.slice(dropIndex, dragIndex));
      
      newOtherItems.push(...state.otherItems.slice(maxIndex + 1, state.otherItems.length));

      return { ...state, otherItems: newOtherItems }      
    }
    default:
      return state
  }
}