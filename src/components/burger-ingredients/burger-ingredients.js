import { useEffect, useRef, useState } from 'react';
import { CurrencyIcon, Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { ingredientType } from '../../utils/types';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';

export default function BurgerIngredients(props) {
  const [activeTab, setActiveTab] = useState('bun');
  const [modalIsOpen, setModalsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const bunsSection = useRef(null);
  const saucesSection = useRef(null);
  const mainsSection = useRef(null);

  useEffect(() => {
    switch(activeTab) {
      case 'bun':
        bunsSection.current.scrollIntoView({behavior: 'smooth'});
        break;
      case 'sauce':
        saucesSection.current.scrollIntoView({behavior: 'smooth'});
        break;
      case 'main':
        mainsSection.current.scrollIntoView({behavior: 'smooth'});
        break;
    }
  }, [activeTab]);

  const countIngredients = (ingredientId) => {
    return props.selectedIngredients
      .filter(item => item['_id'] === ingredientId).length;
  };

  const filterIngredientsByType = () => {
    const buns = props.ingredients.filter(ingredient => ingredient.type === 'bun');
    const sauces = props.ingredients.filter(ingredient => ingredient.type === 'sauce');
    const mains = props.ingredients.filter(ingredient => ingredient.type === 'main');
    return {buns, sauces, mains}
  };

  const openModal = (ingredient) => {
    setModalsOpen(true);
    setModalContent(ingredient);
  };

  const closeModal = () => {
    setModalsOpen(false);
  };

  const modal = 
    modalIsOpen ?
    <ModalOverlay  closeModal={closeModal}>
      <Modal title={'Детали ингредиента'} closeModal={closeModal}>
        <IngredientDetails ingredient={modalContent}/>
      </Modal>
    </ModalOverlay> :
    null;

  const renderIngredientCard = (ingredient) => {
    return (
      <li
        className={`${styles['ingredient-card']}`}
        key={ingredient['_id']}
        onClick={() => openModal(ingredient)}
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
          <Counter count={countIngredients(ingredient['_id'])} size='default' /> :
          null
        }        
      </li>
    )
  };

  return (
    <section className={styles['burger-ingredients']}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
      <div className={`${styles.tabs} mb-10`}>
        <Tab
          value='bun'
          active={activeTab === 'bun'}
          onClick={() => setActiveTab('bun')}
        >Булки</Tab>
        <Tab
          value='sauce'
          active={activeTab === 'sauce'}
          onClick={() => setActiveTab('sauce')}
        >Соусы</Tab>
        <Tab
          value='main'
          active={activeTab === 'main'}
          onClick={() => setActiveTab('main')}
        >Начинки</Tab>
      </div>

      <div className={`${styles.ingredients} custom-scroll`}>
        <div className={`${styles['ingredient-type']}`}>
          <h3 className={`${styles['type-name']} text text_type_main-medium `} ref={bunsSection}>Булки</h3>
          <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
            {filterIngredientsByType().buns.map(ingredient => renderIngredientCard(ingredient))}
          </ul>
        </div>
        <div className={`${styles['ingredient-type']}`}>
          <h3 className={`${styles['type-name']} text text_type_main-medium `} ref={saucesSection}>Соусы</h3>
          <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
            {filterIngredientsByType().sauces.map(ingredient => renderIngredientCard(ingredient))}
          </ul>
        </div>
        <div className={`${styles['ingredient-type']}`}>
          <h3 className={`${styles['type-name']} text text_type_main-medium `} ref={mainsSection}>Начинки</h3>
          <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
            {filterIngredientsByType().mains.map(ingredient => renderIngredientCard(ingredient))}
          </ul>
        </div>
      </div>
      {modal}
    </section>
  )
}

BurgerIngredients.propTypes = {
  selectedIngredients: PropTypes.arrayOf(ingredientType),
  ingredients: PropTypes.arrayOf(ingredientType).isRequired
};
