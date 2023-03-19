import { FC } from 'react';
import ProfileMenu from '../components/profile-menu/profile-menu';
import { useDispatch } from '../hooks/hooks';
import {useEffect} from 'react';
import styles from './pages.module.css';
import MyOrders from '../components/my-orders/my-orders';
import { ordersHistoryConnectionClose, ordersHistoryConnectionStart } from '../services/actions/orders-history';
import { WS_ORDERS_URL } from '../constants/constants';
import { getCookie } from '../utils/cookie';


const OrderHistory: FC = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    console.log('wsOrderFeedConnectionStart')
    // dispatch({
    //   type: ORDER_FEED_CONNECTION_START,
    //   payload: 'wss://norma.nomoreparties.space/orders/all'
    // })
    dispatch(ordersHistoryConnectionStart(`${WS_ORDERS_URL}?token=${getCookie('accessToken')}`));
    // dispatch({
    //   type: ORDER_FEED_CONNECTION_START,
    //   payload: 'wss://norma.nomoreparties.space/orders/all'При создании заказа POST на эндпоинт norma.nomoreparties.space/api/orders (с переданным токеном пользователя) будет присутствовать задержка в 15 секунд. Это необходимо для эмулирования приготовления заказа, обновлённый статус которого можно получить по сокет соединению. Поле status у заказа может иметь значения created, pending, done.

    // });
    return () => {
      console.log('orderFeedConnectionClosed')
      dispatch(ordersHistoryConnectionClose());
    }

  }, [])



  return (
    <>
      <ProfileMenu />
      <MyOrders />
      
      {/* <div className={`${styles['order-history']} mt-30 ml-6`}>
        <h3 className='text text_type_main-medium'>
          Тут пока ничего нет, но скоро появится история заказов
        </h3>        
      </div> */}
    </>
  )
}

export default OrderHistory