import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-card.module.css'
import { useDispatch } from 'react-redux';
import { deleteIngredient, moveIngredient } from '../../services/actions/burger-constructor';
import { useDrag, useDrop } from 'react-dnd';
import {FC, useEffect} from 'react';
import { IIngredient } from '../../utils/types';

interface IConstructorCardProps {
  ingredient: IIngredient;
  ingredientKey: string
}

const ConstructorCard: FC<IConstructorCardProps> = ({ ingredient, ingredientKey }) => {
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
      dragElement: (monitor.getItem() as {key: typeof ingredientKey})?.key
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

export default ConstructorCard
