import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { Link, useRouteMatch } from 'react-router-dom';
import { FC } from 'react';

const AppHeader: FC = () => {
  const mainPage = useRouteMatch('/');
  const orderFeedPage = useRouteMatch('/order-feed');
  const profilePage = useRouteMatch('/profile');
  const orderHistoryPage = useRouteMatch('/profile/orders');

  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.navigation}>
        <ul className={styles['navigation-list']}>

          <li className={`${styles['navigation-list-item']} pt-4 pb-4 pr-5 mr-2`}>
            <Link to={{ pathname: '/' }} className={`${styles.tab}`}>              
              <BurgerIcon type={mainPage?.isExact ? 'primary' : 'secondary'} />
              <p className={`text text_type_main-default ml-2 ${mainPage?.isExact ? 'text_color_primary' : 'text_color_inactive'}`}>
                Конструктор
              </p>
            </Link>
          </li>

          <li className={`${styles['navigation-list-item']} pt-4 pb-4 pr-5 pl-5`}>
            <Link  to={{ pathname: '/order-feed' }} className={`${styles.tab}`}>
              <ListIcon type={orderFeedPage?.isExact ? 'primary' : 'secondary'} />
              <p className={`text text_type_main-default ml-2 ${orderFeedPage?.isExact ? 'text_color_primary' : 'text_color_inactive'}`}>
                Лента заказов
              </p>
            </Link>
          </li>

          <li className={`${styles['navigation-list-item']} ${styles.profile} pt-4 pb-4 pl-5`}>
            <Link href='#' className={`${styles.tab}`} to={{ pathname: '/profile' }}>
              <ProfileIcon type={profilePage?.isExact || orderHistoryPage?.isExact ? 'primary' : 'secondary'} />
              <p className={`text text_type_main-default ml-2 ${profilePage?.isExact || orderHistoryPage?.isExact ?
                'text_color_primary' : 'text_color_inactive'}`}>
                Личный кабинет
                </p>
            </Link>
          </li>
          
        </ul>
      </nav>
      <Link to={{pathname: '/'}}>
        <div className={styles.logo}>
          <Logo />
        </div>
      </Link>
    </header>
  )
}

export default AppHeader
