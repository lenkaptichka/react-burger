import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

export default function IngredientDetails({ingredient}) {
  return (
    <div className={styles.details}>
      <img className={`${styles.image} mb-4`} src={ingredient?.image} alt={ingredient?.name}/>
      <h6 className={`${styles.name} text text_type_main-medium mb-8`}>
        {ingredient?.name}
      </h6>
      <div className={`${styles.information} mb-15`}>
        <p className={`${styles.data} text text_type_main-default text_color_inactive`}>
          {'Калории,ккал\n'}<span className={`${styles.value} text text_type_digits-default mt-2`}>{ingredient?.calories}</span>
        </p>
        <p className={`${styles.data} text text_type_main-default text_color_inactive`}>
          {'Белки, г\n'}<span className={`${styles.value} text text_type_digits-default mt-2`}>{ingredient?.proteins}</span>
        </p>
        <p className={`${styles.data} text text_type_main-default text_color_inactive`}>
          {'Жиры, г\n'}<span className={`${styles.value} text text_type_digits-default mt-2`}>{ingredient?.fat}</span>
        </p>
        <p className={`${styles.data} text text_type_main-default text_color_inactive`}>
          {'Углеводы, г\n'}<span className={`${styles.value} text text_type_digits-default mt-2`}>{ingredient?.carbohydrates}</span>
        </p>
      </div>
    </div>
  )
};

IngredientDetails.propTypes = {
  ingredient: ingredientType,
}
