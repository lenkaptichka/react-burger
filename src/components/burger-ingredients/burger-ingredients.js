import { Component } from 'react';
import { CurrencyIcon, Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

class BurgerIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 'bun' };
  }

  countIngredients = (ingredientId) => {
    return this.props.selectedIngredients
      .filter(item => item['_id'] === ingredientId).length;
  }

  renderIngredientCard = (ingredient) => {
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
        {this.countIngredients(ingredient['_id']) > 0 ?
          <Counter count={this.countIngredients(ingredient['_id'])} size='default' /> :
          null
        }
      </li>
    )
  }

  render() {
    const buns = this.props.ingredients.filter(ingredient => ingredient.type === 'bun');
    const sauces = this.props.ingredients.filter(ingredient => ingredient.type === 'sauce');
    const mains = this.props.ingredients.filter(ingredient => ingredient.type === 'main');
    
    return (
      <section className={styles['burger-ingredients']}>
        
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
        <div className={`${styles.tabs} mb-10`}>
          <Tab value='bun' active={this.state.activeTab === 'bun'} onClick={() => this.setState({ activeTab: 'bun' })}>Булки</Tab>
          <Tab value='sauce' active={this.state.activeTab === 'sauce'} onClick={() => this.setState({ activeTab: 'sauce' })}>Соусы</Tab>
          <Tab value='main' active={this.state.activeTab === 'main'} onClick={() => this.setState({ activeTab: 'main' })}>Начинки</Tab>
        </div>

        <div className={`${styles.ingredients} custom-scroll`}>
          <div className={`${styles['ingredient-type']}`}>
            <h3 className={`${styles['type-name']} text text_type_main-medium `}>Булки</h3>
            <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
              {buns.map(ingredient => this.renderIngredientCard(ingredient))}
            </ul>
          </div>
          <div className={`${styles['ingredient-type']}`}>
            <h3 className={`${styles['type-name']} text text_type_main-medium `}>Соусы</h3>
            <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
              {sauces.map(ingredient => this.renderIngredientCard(ingredient))}
            </ul>
          </div>
          <div className={`${styles['ingredient-type']}`}>
            <h3 className={`${styles['type-name']} text text_type_main-medium `}>Начинки</h3>
            <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
              {mains.map(ingredient => this.renderIngredientCard(ingredient))}
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

BurgerIngredients.propTypes = {
  selectedIngredients: PropTypes.arrayOf(PropTypes.shape({
    '_id': PropTypes.string,
    'name': PropTypes.string,
    'type': PropTypes.string,
    'proteins': PropTypes.number,
    'fat': PropTypes.number,
    'carbohydrates': PropTypes.number,
    'calories': PropTypes.number,
    'price': PropTypes.number,
    'image': PropTypes.string,
    'image_mobile': PropTypes.string,
    'image_large': PropTypes.string,
    '__v': PropTypes.number
  })),
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    '_id': PropTypes.string,
    'name': PropTypes.string,
    'type': PropTypes.string,
    'proteins': PropTypes.number,
    'fat': PropTypes.number,
    'carbohydrates': PropTypes.number,
    'calories': PropTypes.number,
    'price': PropTypes.number,
    'image': PropTypes.string,
    'image_mobile': PropTypes.string,
    'image_large': PropTypes.string,
    '__v': PropTypes.number
  }))
}

export default BurgerIngredients