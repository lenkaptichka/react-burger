import {useState, useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { INGREDIENT_API_URL } from '../../constants/constants';
import { IngredientsContext, SelectedIngredientsContext } from '../../services/app-context';
import checkResponse from '../../utils/check-response';

function App() {
  const [ingredients, setIngredients] = useState({isLoading: false, error: null, allIngredients: []});
  const [selectedIngredients, setSelectedIngredients] = useState({bun: [], otherIngredients: []});
  
  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    setIngredients({ ...ingredients, error: null, isLoading: true });
    fetch(`${INGREDIENT_API_URL}/api/ingredients`)
      .then(checkResponse)
      .then(data => setIngredients({ ...ingredients, allIngredients: data.data, isLoading: false }))
      .catch(error =>  setIngredients({ ...ingredients, error: error, isLoading: false }));
  };

  return (
    <div className={`${styles.main} body`}>
      <AppHeader />
      <main className={styles.mainsection}>
        <IngredientsContext.Provider value={ingredients.allIngredients}>
          <SelectedIngredientsContext.Provider value={{selectedIngredients, setSelectedIngredients}}>
            <BurgerIngredients />
            <BurgerConstructor />
          </SelectedIngredientsContext.Provider>
        </IngredientsContext.Provider>
      </main>
    </div>
  )
}

export default App;
