import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useState } from 'react';
import { fakeOrderNumber } from '../../utils/data';
import ModalOverlay from '../modal-overlay/modal-overlay';

export default function BurgerConstructor(props) {
  const [modalIsOpen, setModalsOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState(fakeOrderNumber);

  const closeModal = () => {
    setModalsOpen(false);
  }

  const modal = modalIsOpen ?
  (<ModalOverlay closeModal={closeModal}>
    <Modal closeModal={closeModal}>
      <OrderDetails orderNumber={orderNumber} />
    </Modal>
  </ModalOverlay>
  ) :
  null;

  const calculateTotalAmount = () => {
    return props.selectedIngredients.reduce((currentSum, ingredient) => {
      if (ingredient.type === 'bun') {
        return currentSum + ingredient.price * 2;
      }
      return currentSum + ingredient.price
    }, 0);
  }

  return (
    <section className={`${styles['burger-constructor']} pt-25 pl-4`}>
      <div className={`${styles.ingredients}`}>
        {props.selectedIngredients.filter(item => item.type === 'bun').map(item => (
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
          {props.selectedIngredients.filter(item => item.type !== 'bun').map((item, index) => (
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
              />
            </div>
          ))}
        </div>
        {props.selectedIngredients.filter(item => item.type === 'bun').map(item => (
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
          onClick={() => setModalsOpen(true)}
        >Оформить заказ</Button>
      </div>
      {modal}
    </section>
  )
};

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.arrayOf(ingredientType)
};

