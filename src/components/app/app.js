import {useState, useEffect} from 'react';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burger-ingredients';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <div className={`${styles.main} body`}>
      <AppHeader />
      <main className={styles.mainsection}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  )
}

export default App;
