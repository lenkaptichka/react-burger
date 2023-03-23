import OrderData from '../components/order-data/order-data';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../hooks/hooks';
import { getOrderDetails } from '../services/actions/order-details';
import { useParams } from 'react-router-dom';

const MyOrderInformation: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id]);

  const {orderDetailsRequest, details, orderDetailsFailed} = useSelector(store => store.orderDetails);

  return (
    <div>
      {orderDetailsRequest && !orderDetailsFailed ?
        <h3 className='text text_type_main-medium'>Загрузка...</h3> :
        !orderDetailsRequest && orderDetailsFailed ?
          <h3 className='text text_type_main-medium'>Произошла ошибка</h3> :
          !orderDetailsRequest && !orderDetailsFailed && details ?
            <OrderData order={details} /> :
            null
      }
    </div>
  )
}

export default MyOrderInformation;