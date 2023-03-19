import { FC } from 'react';
import { useDispatch } from '../hooks/hooks';
import styles from './pages.module.css';
import FeedList from '../components/feed-list/feed-list';
import OrdersInformation from '../components/orders-information/orders-information';
import {useEffect} from 'react';
import { orderFeedConnectionStart, orderFeedConnectionClose, ORDER_FEED_CONNECTION_START } from '../services/actions/order-feed';
import { WS_ORDERS_URL } from '../constants/constants';
import { useSelector } from '../hooks/hooks';

const OrderFeed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.wsOrderFeed.orders);
  const wsConnected = useSelector(state => state.wsOrderFeed.wsConnected)


  // console.log({orders, wsConnected});

  useEffect(() => {
    console.log('wsOrderFeedConnectionStart')
    // dispatch({
    //   type: ORDER_FEED_CONNECTION_START,
    //   payload: 'wss://norma.nomoreparties.space/orders/all'
    // })
    dispatch(orderFeedConnectionStart(`${WS_ORDERS_URL}/all`));
    // dispatch({
    //   type: ORDER_FEED_CONNECTION_START,
    //   payload: 'wss://norma.nomoreparties.space/orders/all'
    // });
    return () => {
      // console.log('orderFeedConnectionClosed')
      dispatch(orderFeedConnectionClose());
    }

  }, [])

  // console.log(2, {orders, wsConnected});

  return (

    <>
      <FeedList />
      <OrdersInformation />
    </>
  )

  // return (
  //   <section className={styles.section}>
  //     <h3 className='text text_type_main-medium'>
  //       {'Скоро здесь появится лента заказов, нужно лишь немного подождать'}
  //     </h3>
  //   </section>
  // )
}

export default OrderFeed;