import { FC, useMemo } from 'react';
import styles from './feed-card.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks/hooks';
import { ORDER_IMAGES_COUNT, ORDER_NUMBER_LENGTH } from '../../constants/constants';

interface IFeedCardProps {
  orderNumber: number;
  date: string;
  name: string;
  ingredientsIds: Array<string>;
  status?: string;
}

const FeedCard: FC<IFeedCardProps> = ({ orderNumber, date, name, ingredientsIds, status }) => {
  const allIngredients = useSelector(state => state.ingredients.allIngredients);

  const formatedOrderNumber = useMemo(() => {
    return `#${String(orderNumber).padStart(ORDER_NUMBER_LENGTH, '0')}`
  }, [orderNumber]);

  const ingredientsImages = useMemo(() => {
    return ingredientsIds
    .map(ingredient => (allIngredients.find(item => item._id === ingredient))?.image);
  }, [ingredientsIds]);

  const imagesOverflowAmount = useMemo(() => {
    return ingredientsIds.length > ORDER_IMAGES_COUNT ?
    ingredientsIds.length - ORDER_IMAGES_COUNT :
    null;
  }, [ingredientsIds]);

  const price = useMemo(() => {
    return ingredientsIds.reduce((currentSum, ingredient) => {
      const ingredientPrice = allIngredients.find(item => item._id === ingredient)?.price;
      return ingredientPrice ? currentSum + ingredientPrice : currentSum;
    }, 0);
  }, [ingredientsIds]);

  const formatedStatus = (status === 'created') ?
    <h5 className={`text text_type_main-default mt-2`}>Создан</h5> :
    status === 'pending' ?
      <h5 className={`text text_type_main-default mt-2`}>Готовится</h5> :
      status === 'done' ?
        <h5 className={`text text_type_main-default text_color_success mt-2`}>Выполнен</h5> :
        '';

  const cardImage = (image: string) => {
    return <>
      <img
        className={`${styles.image}`}
        src={image}
        alt='Изобрежение ингредиента'
      />
    </>
  }

  const extraCardImage = (image: string) => {
    return <>
      <img
        className={`${styles.image} ${styles['dark-image']}`}
        src={image}
        alt='Изобрежение ингредиента'
      />
      <span className={`${styles['overflow-amount']} text text_type_main-default`}>
        +{imagesOverflowAmount}
      </span>
    </>
  }
  
  return (
    <div className={`${styles['feed-card']} p-6 mt-4`}>
      <div className={`${styles.info}`}>
        <h4 className='text text_type_digits-default text_color_primary'>
          {formatedOrderNumber}
        </h4>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(date)} />
        </p>
      </div>
      <h3 className='text text_type_main-medium text_color_primary mt-6'>
        {name}
      </h3>
      
      {status && formatedStatus}

      <div className={`${styles['ingredients-info']} mt-6`}>
        <ul className={`${styles.ingredients}`}>
          {!imagesOverflowAmount ? 
            ingredientsImages.map((image, index) =>
            <li className={`${styles['image-wrapper']}`} key={index}>
              {image && cardImage(image)}
            </li>) :
            ingredientsImages.slice(0, ORDER_IMAGES_COUNT).map((image, index) =>
              (imagesOverflowAmount && index === ORDER_IMAGES_COUNT - 1) ?
                <li className={`${styles['image-wrapper']}`} key={index}>
                  {image && extraCardImage(image)}
                </li> :
                <li className={`${styles['image-wrapper']}`} key={index}>
                  {image && cardImage(image)}
                </li>
            )
          }
        </ul>

        <div className={`${styles.amount} ml-6`}>
          <h3 className={` text text_type_digits-default text_color_primary mr-2`}>
            {price}
          </h3>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}
  
export default FeedCard