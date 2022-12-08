import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useState, useContext } from 'react';
import { SelectedIngredientsContext, IngredientsContext } from '../../services/app-context';
import { bunsCount, INGREDIENT_API_URL } from '../../constants/constants';


export default function BurgerConstructor() {
  const [modalIsOpen, setModalsOpen] = useState(false);
  const [order, setOrder] = useState({ isLoading: false, error: null, orderNumber: null });

  const { selectedIngredients, setSelectedIngredients } = useContext(SelectedIngredientsContext);
  const allIngredients = useContext(IngredientsContext);

  const closeModal = () => {
    setModalsOpen(false);
  };

  const sendOrder = () => {
    setOrder({ ...order, isLoading: true, error: null });
    fetch(`${INGREDIENT_API_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: [...selectedIngredients.bun, ...selectedIngredients.otherIngredients, ...selectedIngredients.bun]
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then(data => {
        console.log(data);
        setOrder({ ...order, orderNumber: data.order.number, isLoading: false });
      })
      .catch(error => setOrder({ ...order, error: error, isLoading: false }));
  }


  // Пока нет drag'n'drop удаление реализовано через индекс
  const deleteIngredient = (ingredientIndex) => {
    setSelectedIngredients({
      ...selectedIngredients,
      otherIngredients: selectedIngredients.otherIngredients
        .filter((item, index) => index !== ingredientIndex)
    })
  }

  const calculateTotalAmount = () => {
    const bunPrice = selectedIngredients.bun[0] ?
      allIngredients.find(item => item._id === selectedIngredients.bun[0]).price * bunsCount :
      0;

    const otherIngredientsPrice = selectedIngredients.otherIngredients
      .reduce((currentSum, ingredient) => {
        const ingredientPrice = allIngredients.find(item => item._id === ingredient).price;
        return currentSum + ingredientPrice;
      }, 0);
    return bunPrice + otherIngredientsPrice;
  };

  const getBun = () => {
    return allIngredients.filter(item => item._id === selectedIngredients.bun[0]);
  }

  const getOtherIngredients = () => {
    return selectedIngredients.otherIngredients
      .map(item => allIngredients.find(el => el._id === item));
  }

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
          {getOtherIngredients().map((item, index) => (
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
                handleClose={() => {
                  deleteIngredient(index);
                }}
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
            sendOrder();
          }}
        >Оформить заказ</Button>
      </div>
      {modalIsOpen && order.orderNumber && !order.isLoading && !order.error ?
        <Modal closeModal={closeModal}>
          <OrderDetails orderNumber={order.orderNumber} />
        </Modal> :
        null
      }
    </section>
  )
};
