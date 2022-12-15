import styles from './order-details.module.css';
import { useSelector } from 'react-redux';
import orderIsDonePicture from '../../images/order-is-done.png';

export default function OrderDetails() {
  const { orderNumber, orderRequest, orderFailed } = useSelector(state => state.orderInformation);

  return (
    <div className={`${styles['order-details']} pt-4 pb-30`}>
      {orderRequest && !orderFailed ?
        <h3 className={`${styles['additional-text']} text text_type_main-large`}>Загрузка...</h3> :
        !orderRequest && orderFailed ?
          <h3 className={`${styles['additional-text']} text text_type_main-large`}>При выполнении запроса произошла ошибка</h3> :
          !orderRequest && !orderFailed && orderNumber ?
            <>
              <h3 className={`${styles.number} text text_type_digits-large mb-8`}>{orderNumber}</h3>
              <p className={'text text_type_main-medium'}>идентификатор заказа</p>
              <img className={'mt-15 mb-15'} src={orderIsDonePicture} alt='Изображение подтверждения заказа' />
              <p className={'text text_type_main-defaul mb-2'}>Ваш заказ начали готовить</p>
              <p className={'text text_type_main-default text_color_inactive'}>Дождитесь готовности на орбитальной станции</p>
            </> :
            null
      }
    </div>
  )
};

