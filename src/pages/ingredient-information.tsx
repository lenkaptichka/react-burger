import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../hooks/hooks';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Modal from '../components/modal/modal';
import { deleteIngredientDetails } from '../services/actions/ingredient-details';
import { IIngredient } from '../utils/types';
import { FC } from 'react';

// const IngredientInformation: FC = () => {
//   const ingredients = useSelector(store => store.ingredients.allIngredients);

//   const history = useHistory();
//   const dispatch = useDispatch();

//   const { id } = useParams<{id: string}>();

//   const closeModal = (): void => {
//     dispatch(deleteIngredientDetails());
//     history.goBack();
//   };

//   const ingredient = ingredients.find(item => item._id === id);
  
//   return (
//     <div>
//       {ingredient && (
//         <Modal title={'Детали ингредиента'} closeModal={closeModal}>
//           <IngredientDetails
//             ingredient={ingredient}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }


const IngredientInformation: FC = () => {
  const ingredients = useSelector(store => store.ingredients.allIngredients);

  const history = useHistory();
  const dispatch = useDispatch();

  const { id } = useParams<{id: string}>();

  const closeModal = (): void => {
    dispatch(deleteIngredientDetails());
    history.goBack();
  };

  const ingredient = ingredients.find(item => item._id === id);
  
  return (
    <div>
      {ingredient && (
        // <Modal title={'Детали ингредиента'} closeModal={closeModal}>
          <IngredientDetails
            ingredient={ingredient}
          />
        // </Modal>
      )}
    </div>
  );
}

export default IngredientInformation