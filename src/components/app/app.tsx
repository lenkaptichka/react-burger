import {Component} from 'react';
import { ingredients, selectedIngredients } from '../../utils/data';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  return (
    <div className={'body'}>
      <AppHeader />
      <main className={styles.mainsection}>
        <BurgerIngredients ingredients={ingredients} selectedIngredients={selectedIngredients} />
        <BurgerConstructor selectedIngredients={selectedIngredients} />
      </main>
    </div>
  )
}

export default App;
