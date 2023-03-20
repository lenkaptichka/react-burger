import { useParams } from 'react-router-dom';
import { useSelector } from '../hooks/hooks';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { FC } from 'react';

const IngredientInformation: FC = () => {
  const ingredients = useSelector(store => store.ingredients.allIngredients);

  const { id } = useParams<{id: string}>();

  const ingredient = ingredients.find(item => item._id === id);
  
  return (
    <div>
      {ingredient && (
        <IngredientDetails
          ingredient={ingredient}
        />
      )}
    </div>
  );
}

export default IngredientInformation