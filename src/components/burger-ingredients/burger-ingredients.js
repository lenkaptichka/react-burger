import { useEffect, useRef, useState, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInView } from 'react-intersection-observer';
import styles from './burger-ingredients.module.css';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredientDetails, deleteIngredientDetails } from '../../services/actions/ingredient-details';
import { Ingredient } from '../ingredient/ingredient';
import { useHistory } from 'react-router-dom';

export default function BurgerIngredients() {
  const [activeTab, setActiveTab] = useState('bun');
  const [modalIsOpen, setModalsOpen] = useState(false);

  const {ref: bunsSectionArea, inView: bunsSectionInView} = useInView({threshold: 0});
  const {ref: saucesSectionArea, inView: saucesSectionView} = useInView({threshold: 0});
  const {ref: mainsSectionArea, inView: mainsSectionView} = useInView({threshold: 0});

  const { allIngredients } = useSelector(state => state.ingredients);

  const dispatch = useDispatch();
  const history = useHistory();

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

  useEffect(() => {
    if (bunsSectionInView) {
      setActiveTab('bun');
    } else if (saucesSectionView) {
      setActiveTab('sauce');
    } else {
      setActiveTab('main');
    }
  }, [bunsSectionInView, saucesSectionView, mainsSectionView]);

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
    history.goBack();
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
        <div className={`${styles['ingredient-type']}`} ref={bunsSectionArea}>
          <h3 className={`${styles['type-name']} text text_type_main-medium `} ref={bunsSection}>Булки</h3>
          <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
            {buns.map(ingredient => <Ingredient key={ingredient._id} ingredient={ingredient} onClick={openModal} />)}
          </ul>
        </div>

        <div className={`${styles['ingredient-type']}`} ref={saucesSectionArea}>
          <h3 className={`${styles['type-name']} text text_type_main-medium `} ref={saucesSection}>Соусы</h3>
          <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
            {sauces.map(ingredient => <Ingredient key={ingredient._id} ingredient={ingredient} onClick={openModal} />)}
          </ul>
        </div>
        
        <div className={`${styles['ingredient-type']}`} ref={mainsSectionArea}>
          <h3 className={`${styles['type-name']} text text_type_main-medium `} ref={mainsSection}>Начинки</h3>
          <ul className={`${styles['ingredient-cards']} mt-6 mb-1 ml-4 mr-4`}>
            {mains.map(ingredient => <Ingredient key={ingredient._id} ingredient={ingredient} onClick={openModal} />)}
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
