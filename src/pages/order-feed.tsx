import { FC } from 'react';
import styles from './pages.module.css';

const OrderFeed: FC = () => {
  return (
    <section className={styles.section}>
      <h3 className='text text_type_main-medium'>
        {'Скоро здесь появится лента заказов, нужно лишь немного подождать'}
      </h3>
    </section>
  )
}

export default OrderFeed;