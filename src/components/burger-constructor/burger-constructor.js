import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useState, useMemo } from 'react';
import { bunsCount } from '../../constants/constants';
import { deleteIngredient } from '../../services/actions/burger-constructor';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder } from '../../services/actions/order';

export default function BurgerConstructor() {
  const [modalIsOpen, setModalsOpen] = useState(false);

  const { allIngredients } = useSelector(state => state.ingredients);
  const selectedIngredients = useSelector(state => state.selectedIngredients);
  const dispatch = useDispatch();

  const closeModal = () => {
    setModalsOpen(false);
  };

  const sendOrderHandler = () => {
    const { bun, otherIngredients} = selectedIngredients;
    dispatch(sendOrder([...bun, ...otherIngredients, ...bun]));
  }

  const getBunPrice = useMemo(() => () => {
    return selectedIngredients.bun[0] ?
      allIngredients.find(item => item._id === selectedIngredients.bun[0]).price * bunsCount :
      0
  }, [selectedIngredients.bun]);

  const getOtherIngredientsPrice =  useMemo(() => () => {
    return selectedIngredients.otherIngredients
      .reduce((currentSum, ingredient) => {
        const ingredientPrice = allIngredients.find(item => item._id === ingredient).price;
        return currentSum + ingredientPrice;
      }, 0);
  }, [selectedIngredients.otherIngredients])

  const calculateTotalAmount = () => {
    return getBunPrice() + getOtherIngredientsPrice();
  };


  const getBun = useMemo(() => () => {
    return allIngredients.filter(item => item._id === selectedIngredients.bun[0]);
  }, [selectedIngredients]);

  const getOtherIngredients = useMemo(() => () => {
    return selectedIngredients.otherIngredients
      .map(item => allIngredients.find(el => el._id === item));
  }, [selectedIngredients])

  return (
    <section className={`${styles['burger-constructor']} pt-25 pl-4`}>
      <div className={`${styles.ingredients}`}>
        {getBun().map(item => (
          <div className={`${styles.ingredient} pl-8 mb-4 mr-4`} key={`${item._id}_top`}>
            <ConstructorElement
              text={`${item.name} (верх)`}
              price={item.price}
              type='top'
              isLocked={true}
              thumbnail={item.image}
            />
          </div>
        ))}
        <div className={`${styles['unlocked-ingredients']} custom-scroll`}>
          {getOtherIngredients()?.map((item, index) => (
            <div className={`${styles.ingredient} pl-8 mb-4`} key={`${item._id}_${index}`}>
              {!false &&
                <div className={styles['drag-icon-wrapper']}>
                  <DragIcon type='primary' />
                </div>
              }
              <ConstructorElement
                text={item.name}
                price={item.price}
                isLocked={false}
                thumbnail={item.image}
                // Пока нет drag'n'drop удаление реализовано через индекс
                handleClose={() => dispatch(deleteIngredient(index))}
              />
            </div>
          ))}
        </div>
        {getBun().map(item => (
          <div className={`${styles.ingredient} pl-8 mt-4 mr-4`} key={`${item._id}_bottom`}>
            <ConstructorElement
              text={`${item.name} (низ)`}
              price={item.price}
              type='bottom'
              isLocked={true}
              thumbnail={item.image}
            />
          </div>
        ))}
      </div>
      <div className={`${styles.info} mt-10 mb-10 mr-4`}>
        <div className={`${styles.amount} mr-10`}>
          <h3 className={`${styles['amount-text']} text text_type_digits-medium`}>{calculateTotalAmount()}</h3>
          <CurrencyIcon type='primary' />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          onClick={() => {
            setModalsOpen(true);
            sendOrderHandler();
          }}
        >Оформить заказ</Button>
      </div>
      {modalIsOpen ?
        <Modal closeModal={closeModal}>
          <OrderDetails />
        </Modal> :
        null
      }
    </section>
  )
};
