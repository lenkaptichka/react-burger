import { useEffect, useRef, useState, useMemo } from 'react';
import { CurrencyIcon, Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { bunsCount } from '../../constants/constants';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient } from '../../services/actions/burger-constructor';
import { addIngredientDetails, deleteIngredientDetails } from '../../services/actions/ingredient-details';
import { Ingredient } from '../ingredient/ingredient';


export default function BurgerIngredients() {
  const [activeTab, setActiveTab] = useState('bun');
  const [modalIsOpen, setModalsOpen] = useState(false);

  const { allIngredients } = useSelector(state => state.ingredients);

  const dispatch = useDispatch();

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

  const buns = useMemo(
    () => allIngredients.filter(ingredient => ingredient.type === 'bun'),
    [allIngredients]);

  const sauces = useMemo(
    () => allIngredients.filter(ingredient => ingredient.type === 'sauce'),
    [allIngredients]);
    
  const mains = useMemo(
    () => allIngredients.filter(ingredient => ingredient.type === 'main'),
    [allIngredients]);

  const openModal = (ingredient) => {
    setModalsOpen(true);
    dispatch(addIngredientDetails(ingredient));
  };

  const closeModal = () => {
    setModalsOpen(false);
    dispatch(deleteIngredientDetails());
  };

  // const renderIngredientCard = (ingredient) => {
  //   return (
  //     <li
  //       className={`${styles['ingredient-card']}`}
  //       key={ingredient._id}
  //       onClick={() => {
  //         openModal(ingredient);
  //         // Добавление выбранного ингредиента
  //         dispatch(addIngredient(ingredient));
  //       }}
  //     >
  //       <img
  //         src={ingredient.image}
  //         alt={ingredient.name}
  //         className={`${styles.image} ml-4 mr-4 mb-4`}
  //       />
  //       <div className={styles.price}>
  //         <h5 className='text text_type_digits-default mr-2'>{ingredient.price}</h5>
  //         <CurrencyIcon type='primary' />
  //       </div>
  //       <h4 className={`${styles.name} text_type_main-default mt-1`}>{ingredient.name}</h4>
  //       {countIngredients(ingredient['_id']) > 0 ?
  //         <Counter count={countIngredients(ingredient['_id'])} size='default' /> :
  //         null
  //       }
  //     </li>
  //   )
  // };

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
            {buns.map(ingredient => <Ingredient key={ingredient._id} ingredient={ingredient} openModal={openModal} />)}
          </ul>
        </div>
        <div className={`${styles['ingredient-type']}`}>
          <h3 className={`${styles['type-name']} text text_type_main-medium `} ref={saucesSection}>Соусы</h3>
          <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
            {sauces.map(ingredient => <Ingredient key={ingredient._id} ingredient={ingredient} openModal={openModal} />)}
          </ul>
        </div>
        <div className={`${styles['ingredient-type']}`}>
          <h3 className={`${styles['type-name']} text text_type_main-medium `} ref={mainsSection}>Начинки</h3>
          <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
            {mains.map(ingredient => <Ingredient key={ingredient._id} ingredient={ingredient} openModal={openModal} />)}
          </ul>
        </div>
      </div>
      {modalIsOpen ?
        <Modal title={'Детали ингредиента'} closeModal={closeModal}>
          <IngredientDetails />
        </Modal> :
        null
      }
    </section>
  )
}
