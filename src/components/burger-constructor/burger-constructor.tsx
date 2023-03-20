import styles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useState, useMemo, FC } from 'react';
import { BUNS_COUNT } from '../../constants/constants';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { sendOrder } from '../../services/actions/order';
import { useDrop } from 'react-dnd';
import { addIngredient } from '../../services/actions/burger-constructor';
import ConstructorCard from '../constructor-card/constructor-card';
import { getCookie } from '../../utils/cookie';
import { useHistory } from 'react-router-dom';
import { IIngredient } from '../../utils/types';

interface IOtherItems {
  _id: string;
  key: string;
}

const BurgerConstructor: FC = () => {
  const [modalIsOpen, setModalsOpen] = useState<boolean>(false);


  const allIngredients = useSelector(state => state.ingredients.allIngredients);
  const { bun, otherItems } = useSelector(state => state.selectedIngredients);

  const dispatch = useDispatch();
  const history = useHistory();

  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient: IIngredient) {
      dispatch(addIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const checkToken = (): void => {
    if (getCookie('accessToken')) {
      setModalsOpen(true);
      sendOrderHandler();
    } else {
      history.push('/login');
    }
  }

  const closeModal = (): void => {
    setModalsOpen(false);
  };

  const sendOrderHandler = (): void => { 
    const orderIngredients = [...bun, ...otherItems.map(item => item._id), ...bun]; 
    dispatch(sendOrder(orderIngredients) as any);
  }

  const bunPrice = useMemo(() => {
    if (bun[0]) {
      const selectedBun = allIngredients.find(item => item._id === bun[0]);
      return selectedBun ? selectedBun.price * BUNS_COUNT : 0;
    } else {
      return 0
    }
  }, [bun, allIngredients]);

  const getIngredientKey = (index: number): string => {
    return otherItems[index].key
  }

  const otherItemsPrice = useMemo(() => {
    return otherItems.reduce((currentSum: number, ingredient: IOtherItems): number => {
      const ingredientPrice = allIngredients.find(item => item._id === ingredient._id)?.price;
      return ingredientPrice ? currentSum + ingredientPrice : currentSum;
    }, 0);
  }, [otherItems, allIngredients])

  const calculateTotalAmount = (): number => {
    return bunPrice + otherItemsPrice;
  };

  const selectedBun = useMemo(() => {
    return allIngredients.filter(item => item._id === bun[0]);
  }, [bun, allIngredients]);

  const selectedOtherItems = useMemo(() => {
    return otherItems.map(item => allIngredients.find(el => el._id === item._id));
  }, [otherItems, allIngredients]);

  const orderButtonIsDisabled = useMemo(() => {
    return Boolean((selectedBun.length === 0 || selectedOtherItems.length === 0));
  }, [selectedBun, selectedOtherItems]);

  return (
    <section className={`${styles['burger-constructor']} ${isHover ? styles['burger-constructor-hovered'] : ''} pt-25 pl-4`} ref={dropTarget} >
      <div className={`${styles.ingredients} `} >
        {selectedBun.map(item => (
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
          {selectedOtherItems?.map((item, index: number) => (
            item && <ConstructorCard ingredient={item} key={getIngredientKey(index)} ingredientKey={getIngredientKey(index)} />
          ))}
        </div>
        {selectedBun.map((item) => (
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
          onClick={checkToken}
          disabled={orderButtonIsDisabled}
        >
          Оформить заказ
        </Button>
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

export default BurgerConstructor
