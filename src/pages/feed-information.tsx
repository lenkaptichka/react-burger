import OrderData from '../components/order-data/order-data';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../hooks/hooks';

import { useHistory, useParams } from 'react-router-dom';
import Modal from '../components/modal/modal';
import { ORDER_NUMBER_LENGTH } from '../constants/constants';
import { getOrderDetails } from '../services/actions/order-details';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';




const FeedInformation: FC = () => {

  const orders = useSelector(store => store.wsOrderFeed.orders);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id])

  const {orderDetailsRequest, details, orderDetailsFailed} = useSelector(store => store.orderDetails);



  return (
    <div>
      {details && (
        // <Modal title={`#${String(order.number).padStart(ORDER_NUMBER_LENGTH, '0')}`} closeModal={closeModal}>
          <OrderData order={details} />
        // </Modal>
      )}
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


// const FeedInformation: FC = () => {
//   const orders = useSelector(store => store.wsOrderFeed.orders);
//   const history = useHistory();

//   const { id } = useParams<{ id: string }>();

//   const order = orders.find(item => item._id === id)!;

//   console.log({ orders, order });

//   const closeModal = (): void => {
//     // dispatch(deleteIngredientDetails());
//     history.goBack();
//   };



//   return (
//     <div>
//       {order && (
//         <Modal title={`#${String(order.number).padStart(ORDER_NUMBER_LENGTH, '0')}`} closeModal={closeModal}>
//           <OrderData order={order} />
//         </Modal>
//       )}
//     </div>
//   )

//   // return (
//   //   <>
//   //   <p>{ id } < /p>
//   //       {
//   //   order && <OrderData order={ order } />}
//   //     < />
//   //   {/* 
//   //     // <section className={styles.section}>

//   //     // </section> */}
//   //   )
// }

export default FeedInformation;