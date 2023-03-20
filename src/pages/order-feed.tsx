import { FC } from 'react';
import { useDispatch } from '../hooks/hooks';
import FeedList from '../components/feed-list/feed-list';
import OrdersInformation from '../components/orders-information/orders-information';
import {useEffect} from 'react';
import { orderFeedConnectionStart, orderFeedConnectionClose } from '../services/actions/order-feed';
import { WS_ORDERS_URL } from '../constants/constants';

const OrderFeed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderFeedConnectionStart(`${WS_ORDERS_URL}/all`));
    return () => {
      dispatch(orderFeedConnectionClose());
    }
  }, [])

  return (
    <>
      <FeedList />
      <OrdersInformation />
    </>
  )
}

export default OrderFeed;