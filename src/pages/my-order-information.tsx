import OrderData from '../components/order-data/order-data';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../hooks/hooks';
// import { useSelector, useDispatch } from '../hooks/hooks';

// import { useHistory, useParams } from 'react-router-dom';
// import Modal from '../components/modal/modal';
import { ORDER_NUMBER_LENGTH } from '../constants/constants';
import { getOrderDetails } from '../services/actions/order-details';

import { useHistory, useParams } from 'react-router-dom';
import Modal from '../components/modal/modal';



const MyOrderInformation: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  console.log({id})

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id]);

  const {orderDetailsRequest, details, orderDetailsFailed} = useSelector(store => store.orderDetails);


  // const orders = useSelector(store => store.wsOrdersHistory.orders);
  // const history = useHistory();

  // const { id } = useParams<{ id: string }>();

  // const order = orders.find(item => item._id === id)!;

  // console.log({ orders, order });

  // const closeModal = (): void => {
  //   // dispatch(deleteIngredientDetails());
  //   history.goBack();
  // };



  return (
    <div>
      {details ? (
        // <Modal closeModal={closeModal}>
          <OrderData order={details} />
        // </Modal>
      ) : <p>Подождите</p>}
    </div>
  )

  // return (
  //   <>
  //   <p>{ id } < /p>
  //       {
  //   order && <OrderData order={ order } />}
  //     < />
  //   {/* 
  //     // <section className={styles.section}>

  //     // </section> */}
  //   )
}

export default MyOrderInformation;