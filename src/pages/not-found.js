import { Link } from 'react-router-dom';
import styles from './pages.module.css';

const NotFound = () => {
  return (
    <section className={styles.section}>
      <h2 className={`${styles['light-digits']} text text_type_digits-large mb-15`}>404</h2>
      <h4 className='text text_type_main-medium mb-10'>Кажется, тут ничего нет...</h4>
      <Link className='text text_type_main-medium text_color_primary' style={{textDecoration: 'none'}} to='/'>Может стоит заказать ещё один бургер?</Link>
    </section>
  )
}

export default NotFound