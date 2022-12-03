import {useState, useEffect} from 'react';
import { selectedIngredients } from '../../utils/data';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { INGREDIENT_API_URL } from '../../constants/constants';


function App() {
  const [ingredients, setIngredients] = useState({isLoading: false, error: null, data: []});

  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    setIngredients({ ...ingredients, error: null, isLoading: true });
    fetch(INGREDIENT_API_URL)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then(data => setIngredients({ ...ingredients, data: data.data, isLoading: false }))
      .catch(error =>  setIngredients({ ...ingredients, error: error, isLoading: false }));
  };

  return (
    <div className={`${styles.main} body`}>
      <AppHeader />
      <main className={styles.mainsection}>
        <BurgerIngredients ingredients={ingredients.data} selectedIngredients={selectedIngredients} />
        <BurgerConstructor selectedIngredients={selectedIngredients} />
      </main>
    </div>
  )
}

export default App;
