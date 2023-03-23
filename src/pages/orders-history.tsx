import { FC } from 'react';
import ProfileMenu from '../components/profile-menu/profile-menu';
import { useDispatch } from '../hooks/hooks';
import {useEffect} from 'react';
import MyOrders from '../components/my-orders/my-orders';
import { ordersHistoryConnectionClose, ordersHistoryConnectionStart } from '../services/actions/orders-history';
import { WS_ORDERS_URL } from '../constants/constants';
import { getCookie } from '../utils/cookie';

const OrderHistory: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ordersHistoryConnectionStart(`${WS_ORDERS_URL}?token=${getCookie('accessToken')}`));
    return () => {
      dispatch(ordersHistoryConnectionClose());
    }
  }, [])

  return (
    <>
      <ProfileMenu />
      <MyOrders />
    </>
  )
}

export default OrderHistory