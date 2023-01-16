import styles from './ingredient.module.css';
import { useSelector } from 'react-redux';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { BUNS_COUNT } from '../../constants/constants';
import { useDrag } from 'react-dnd';
import { IIngredient } from '../../utils/types';
import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';

interface IIngredientProps {
  ingredient: IIngredient;
  onClick: (ingredient: IIngredient) => void
}

interface ISelectedIngredients {
  bun: Array<string>;
  otherItems: Array<{_id: string, key: string}>
}

export const Ingredient: FC<IIngredientProps> = ({ ingredient, onClick }) => {
  
  // TODO Исправить в следующем спринте
  // @ts-expect-error
  const { bun, otherItems } = useSelector(state => state.selectedIngredients) as ISelectedIngredients;

  const location = useLocation<Location>();
  
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  });

  const countIngredients = (ingredientId: string): number => {
    if (bun.find(item => item === ingredientId)) {
      return BUNS_COUNT;
    } else {
      return otherItems.filter(item => item._id === ingredientId).length;
    }
  };

  return (
    <Link
      to={{
        pathname: `/ingredients/${ingredient._id}`,
        state: { background: location }
      }}
      className={`${styles.link}`}
    >
      <li
        ref={dragRef}
        className={`${styles.ingredient}`}
        onClick={() => onClick(ingredient)}
      >
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={`${styles.image} ml-4 mr-4 mb-4`}
        />
        <div className={styles.price}>
          <h5 className='text text_type_digits-default text_color_primary mr-2'>{ingredient.price}</h5>
          <CurrencyIcon type='primary' />
        </div>
        <h4 className={`${styles.name} text_type_main-default text_color_primary mt-1`}>{ingredient.name}</h4>
        {countIngredients(ingredient['_id']) > 0 ?
          <Counter count={countIngredients(ingredient._id)} size='default' /> :
          null
        }
      </li>
    </Link>
  )
}
