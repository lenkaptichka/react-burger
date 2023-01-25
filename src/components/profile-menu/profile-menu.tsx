import { Link, useRouteMatch } from 'react-router-dom';
import styles from './profile-menu.module.css';
import { useDispatch } from 'react-redux';
import { logout } from '../../services/actions/user';
import { FC } from 'react';

const ProfileMenu: FC = () => {
  const profilePage = useRouteMatch('/profile');
  const orderHistoryPage = useRouteMatch('/profile/orders');

  const dispatch = useDispatch();

  const clickLogout = (): void => {
    // TODO Исправить в следующем спринте
    // @ts-expect-error
    dispatch(logout());
  };

  return (
    <div className={`${styles.navigation} mr-15 mt-30`}>
      <nav>
        <ul className={styles['navigation-list']}>
          <li className={styles['navigation-list-item']}>
            <Link
              className={`${styles.link} text text_type_main-medium ${profilePage?.isExact ? 'text_color_primary' : 'text_color_inactive'}`}
              to={{ pathname: '/profile' }}
            >
              Профиль
            </Link>
          </li>
          <li className={styles['navigation-list-item']}>
            <Link
              className={`${styles.link} text text_type_main-medium ${orderHistoryPage?.isExact ? 'text_color_primary' : 'text_color_inactive'}`}
              to={{ pathname: `/profile/orders` }}
            >
              История заказов
            </Link>
          </li>
          <li className={styles['navigation-list-item']}>
            <button
              className={`${styles.button} text text_type_main-medium text_color_inactive`}
              onClick={clickLogout}
            >
              Выход
            </button>
          </li>
        </ul>
      </nav>
      <p className={`${styles.info} text text_type_main-default text_color_inactive mt-20`}>
        {`В этом разделе вы можете
        изменить свои персональные данные`}
      </p>
    </div>
  )
}

export default ProfileMenu