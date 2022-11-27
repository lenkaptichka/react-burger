import {Component} from 'react';
import { ingredients, selectedIngredients } from '../../utils/data';
import styles from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

class App extends Component {
  render() {
    return (
      <div className={'body'}>
        <AppHeader />
        <main className={styles.mainsection}>
          <BurgerIngredients ingredients={ingredients} selectedIngredients={selectedIngredients}/>
          <BurgerConstructor selectedIngredients={selectedIngredients}/>
        </main>
      </div>
    )
  }
}

export default App;
