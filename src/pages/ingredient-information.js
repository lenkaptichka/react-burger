import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import Modal from "../components/modal/modal";
import { deleteIngredientDetails } from "../services/actions/ingredient-details";
const IngredientInformation = () => {
  const ingredients = useSelector((store) => store.ingredients.allIngredients);
  const history = useHistory();
  const dispatch = useDispatch();
  const id = history.location.pathname.replace("/ingredients/", "");

  const closeModal = () => {
    // setModalsOpen(false);
    dispatch(deleteIngredientDetails());
    history.goBack();
  };
  
  return (
    <div>
      {ingredients && (
        <Modal title={'Детали ингредиента'} closeModal={closeModal}>
          <IngredientDetails
            ingredient={ingredients.filter(item => item._id === id)[0]}
          />
        </Modal>

      )}
    </div>
  );

}

export default IngredientInformation