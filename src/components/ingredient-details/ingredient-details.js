import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

export default function IngredientDetail() {
  const {
    name,
    calories,
    proteins,
    fat,
    carbohydrates,
    image
  } = useSelector(state => state.ingredientDetails.ingredient);
  return (
    <div className={styles.details}>
      <img className={`${styles.image} mb-4`} src={image} alt={name}/>
      <h6 className={`${styles.name} text text_type_main-medium mb-8`}>
        {name}
      </h6>
      <div className={`${styles.information} mb-15`}>
        <p className={`${styles.data} text text_type_main-default text_color_inactive`}>
          {'Калории,ккал\n'}<span className={`${styles.value} text text_type_digits-default mt-2`}>{calories}</span>
        </p>
        <p className={`${styles.data} text text_type_main-default text_color_inactive`}>
          {'Белки, г\n'}<span className={`${styles.value} text text_type_digits-default mt-2`}>{proteins}</span>
        </p>
        <p className={`${styles.data} text text_type_main-default text_color_inactive`}>
          {'Жиры, г\n'}<span className={`${styles.value} text text_type_digits-default mt-2`}>{fat}</span>
        </p>
        <p className={`${styles.data} text text_type_main-default text_color_inactive`}>
          {'Углеводы, г\n'}<span className={`${styles.value} text text_type_digits-default mt-2`}>{carbohydrates}</span>
        </p>
      </div>
    </div>
  )
};
