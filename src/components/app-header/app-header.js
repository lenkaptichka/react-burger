import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav className={styles.navigation}>
        <ul className={styles['navigation-list']}>
          <li className={`${styles['navigation-list-item']} pt-4 pb-4 pr-5 mr-2`}>
            <a href='#' className={`${styles.tab}`}>
              <BurgerIcon type='primary' />
              <p className='text text_type_main-default text_color_primary ml-2'>Конструктор</p>
            </a>
          </li>
          <li className={`${styles['navigation-list-item']} pt-4 pb-4 pr-5 pl-5`}>
            <a href='#' className={`${styles.tab}`}>
              <ListIcon type='secondary' />
              <p className='text text_type_main-default ml-2 text_color_inactive'>Лента заказов</p>
            </a>
          </li>
          <li className={`${styles['navigation-list-item']} ${styles.profile} pt-4 pb-4 pl-5`}>
            <a href='#' className={`${styles.tab}`}>
              <ProfileIcon type='secondary' />
              <p className='text text_type_main-default ml-2 text_color_inactive'>Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.logo}>
        <Logo />
      </div>
    </header>
  )
}
