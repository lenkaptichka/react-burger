import { useEffect, useState, FC } from 'react';
import styles from './orders-information.module.css';
import { useSelector } from '../../hooks/hooks';


const OrdersInformation: FC = () => {
  const {orders, total, totalToday} = useSelector(state => state.wsOrderFeed);

  const ordersIsDone = orders.filter(order => order.status === 'done').slice(0, 20);
  const ordersIsPending = orders.filter(order => order.status === 'pending').slice(0, 20);

  // console.log(ordersIsDone)
  return (
    <section className={`${styles['orders-information']} pt-25 pb-10`}>
      <div className={`${styles['orders-numbers']} mb-15`}>
        <div className={`${styles.statuses}`}>
          <h5 className='text text_type_main-medium mb-6'>Готовы:</h5>
          <div className={`${styles.numbers}`}>
            {ordersIsDone.map(order =>
              <p key={order.number} className='text text_type_digits-default text_color_success mb-2'>
                {String(order.number).padStart(6, '0')}
              </p>
            )}
          </div>
        </div>
        <div className={`${styles.statuses}`}>
          <h5 className='text text_type_main-medium mb-6'>В работе:</h5>
          <div className={`${styles.numbers}`}>
            {ordersIsPending.map(order =>
              <p key={order.number} className='text text_type_digits-default mb-2'>
                {String(order.number).padStart(6, '0')}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className='mb-15'>
        <h5 className='text text_type_main-medium'>Выполнено за все время:</h5>
        <h3 className={`${styles.amount} text text_type_digits-large`}>{total && total.toLocaleString()}</h3>
      </div>

      <div className='mb-15'>
        <h5 className='text text_type_main-medium'>Выполнено за сегодня:</h5>
        <h3 className={`${styles.amount} text text_type_digits-large`}>
          {totalToday && totalToday.toLocaleString()}
        </h3>
      </div>
    </section>
  )
}

export default OrdersInformation