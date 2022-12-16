import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-card.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { deleteIngredient, moveIngredient } from '../../services/actions/burger-constructor';
import { useDrag, useDrop } from 'react-dnd';
import {useEffect} from 'react';
// import { moveIngredient } from '../../services/actions/burger-constructor';

export default function ConstructorCard({ingredient, ingredientKey}) {
  const dispatch = useDispatch();

  const [{opacity}, dragRef] = useDrag({
    type: 'constructor-card',
    item: {key: ingredientKey},
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    })      
  })

  const [{isOver, dragElement}, dropRef] = useDrop({
    accept: 'constructor-card',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      dragElement: monitor.getItem()?.key,
    })
  });

  useEffect(() => {
    if (isOver && dragElement !== ingredientKey) {
      dispatch(moveIngredient(dragElement, ingredientKey))
    }
  }, [dragElement, isOver])

  return (
    <div className={`${styles.ingredient} pl-8 mb-4`} ref={dropRef}>
      <div ref={dragRef} style={{opacity}}>
        <div className={styles['drag-icon-wrapper']} >
          <DragIcon type='primary' />
        </div>
        <ConstructorElement
          text={ingredient.name}
          
          price={ingredient.price}
          isLocked={false}
          thumbnail={ingredient.image}
          handleClose={() => dispatch(deleteIngredient(ingredientKey))}
        />
      </div>
    </div>
  )
}