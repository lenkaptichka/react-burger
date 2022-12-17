import styles from './ingredient.module.css';
import { useSelector } from 'react-redux';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { bunsCount } from '../../constants/constants';
import { useDrag, DragPreviewImage } from 'react-dnd';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

export const Ingredient = ({ ingredient, onClick }) => {
  const { bun, otherItems } = useSelector(state => state.selectedIngredients);
  const [, dragRef, dragPreviewRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  });

  const countIngredients = (ingredientId) => {
    if (bun.find(item => item === ingredientId)) {
      return bunsCount;
    } else {
      return otherItems.filter(item => item._id === ingredientId).length;
    }
  };

  const previewImage = ingredient.image_large;

  return (
    <>
      <DragPreviewImage connect={dragPreviewRef} src={previewImage} />
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
          <h5 className='text text_type_digits-default mr-2'>{ingredient.price}</h5>
          <CurrencyIcon type='primary' />
        </div>
        <h4 className={`${styles.name} text_type_main-default mt-1`}>{ingredient.name}</h4>
        {countIngredients(ingredient['_id']) > 0 ?
          <Counter count={countIngredients(ingredient._id)} size='default' /> :
          null
        }
      </li>
    </>    
  )
}

Ingredient.propTypes = {
  ingredient: ingredientType.isRequired,
  openModal: PropTypes.func.isRequired
};
