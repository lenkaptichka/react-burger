import { Component } from 'react';
import { useState } from 'react';
import { CurrencyIcon, Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { ingredientType } from '../../utils/types';

function BurgerIngredients(props) {
  const [activeTab, setActiveTab] = useState('bun');

  const countIngredients = (ingredientId) => {
    return props.selectedIngredients
      .filter(item => item['_id'] === ingredientId).length;
  }

  const filterIngredientsByType = () => {
    const buns = props.ingredients.filter(ingredient => ingredient.type === 'bun');
    const sauces = props.ingredients.filter(ingredient => ingredient.type === 'sauce');
    const mains = props.ingredients.filter(ingredient => ingredient.type === 'main');
    return {buns, sauces, mains}
  }

  const renderIngredientCard = (ingredient) => {
    return (
      <li className={`${styles['ingredient-card']}`} key={ingredient['_id']}>
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
          <Counter count={countIngredients(ingredient['_id'])} size='default' /> :
          null
        }
      </li>
    )
  }

  return (
    <section className={styles['burger-ingredients']}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <div className={`${styles.tabs} mb-10`}>
        <Tab value='bun' active={activeTab === 'bun'} onClick={() => setActiveTab('bun')}>Булки</Tab>
        <Tab value='sauce' active={activeTab === 'sauce'} onClick={() => setActiveTab('sauce')}>Соусы</Tab>
        <Tab value='main' active={activeTab === 'main'} onClick={() => setActiveTab('main')}>Начинки</Tab>
      </div>

      <div className={`${styles.ingredients} custom-scroll`}>
        <div className={`${styles['ingredient-type']}`}>
          <h3 className={`${styles['type-name']} text text_type_main-medium `}>Булки</h3>
          <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
            {filterIngredientsByType().buns.map(ingredient => renderIngredientCard(ingredient))}
          </ul>
        </div>
        <div className={`${styles['ingredient-type']}`}>
          <h3 className={`${styles['type-name']} text text_type_main-medium `}>Соусы</h3>
          <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
            {filterIngredientsByType().sauces.map(ingredient => renderIngredientCard(ingredient))}
          </ul>
        </div>
        <div className={`${styles['ingredient-type']}`}>
          <h3 className={`${styles['type-name']} text text_type_main-medium `}>Начинки</h3>
          <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
            {filterIngredientsByType().mains.map(ingredient => renderIngredientCard(ingredient))}
          </ul>
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  selectedIngredients: PropTypes.arrayOf(ingredientType),
  ingredients: PropTypes.arrayOf(ingredientType)
}

export default BurgerIngredients