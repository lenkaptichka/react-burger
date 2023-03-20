import { FC } from 'react';
import styles from './feed-list.module.css';
import FeedCard from '../feed-card/feed-card';
import { useSelector } from '../../hooks/hooks';
import { Link, useLocation } from 'react-router-dom';

const FeedList: FC = () => {
  const orders = useSelector(state => state.wsOrderFeed.orders);
  const location = useLocation<Location>();

  return (
    <section className={`${styles['feed-list']}`}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
       <div className={`${styles.feeds} custom-scroll pr-4`}>

        {orders.map(item => 
        <Link
          className={`${styles.link} mt-4`}
          key={item._id}
          to={{
            pathname: `/order-feed/${item.number}`,
            state: { background: location }
          }}
        >
          <FeedCard
            ingredientsIds={item.ingredients}
            orderNumber={item.number}
            date={item.createdAt}
            name={item.name}
          />
        </Link>
        )}
      </div>
    </section>
  )
}

export default FeedList