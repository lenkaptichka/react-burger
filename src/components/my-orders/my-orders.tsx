
import { FC } from 'react';
import FeedCard from '../feed-card/feed-card';
import styles from './my-orders.module.css';
import { useSelector } from '../../hooks/hooks';
import { Link, useLocation } from 'react-router-dom';

const MyOrders: FC = () => {
  const orders = useSelector(state => state.wsOrdersHistory.orders);
  const location = useLocation<Location>();

  return (
    <section className={`${styles['my-orders']} custom-scroll pr-4`}>
      {orders.map((item, index) =>
        <Link
          className={`${styles.link} mt-4`}
          key={index}
          to={{
            pathname: `/profile/orders/${item.number}`,
            state: { background: location }
          }}
        >
          <FeedCard
            ingredientsIds={item.ingredients}
            orderNumber={item.number}
            date={item.createdAt}
            name={item.name}
            status={item.status}
          />
        </Link>
      )}
    </section>
  )
}

export default MyOrders;