import styles from './ingredient.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { CurrencyIcon, Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredient } from '../../services/actions/burger-constructor';
import { bunsCount } from '../../constants/constants';

export const Ingredient = ({ingredient, openModal}) => {
  const selectedIngredients = useSelector(state => state.selectedIngredients);

  const dispatch = useDispatch();

  const countIngredients = (ingredientId) => {
    if (selectedIngredients.bun.find(item => item === ingredientId)) {
      return bunsCount;
    } else {
      return selectedIngredients.otherIngredients.filter(item => item === ingredientId).length;
    }
  };

  return (
    <li
      className={`${styles.ingredient}`}
      onClick={() => {
        openModal(ingredient);
        // Добавление выбранного ингредиента
        dispatch(addIngredient(ingredient));
      }}
    >
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={`${styles.image} ml-4 mr-4 mb-4`}
      />
      <div className={styles.price}>
        <h5 className='text text_type_digits-default mr-2'>{ingredient.price}</h5>
        <CurrencyIcon type='primary' />
      </div>
      <h4 className={`${styles.name} text_type_main-default mt-1`}>{ingredient.name}</h4>
      {countIngredients(ingredient['_id']) > 0 ?
        <Counter count={countIngredients(ingredient._id)} size='default' /> :
        null
      }
    </li>
  )
}