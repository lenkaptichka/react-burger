import { Link } from 'react-router-dom';
import styles from './pages.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const NotFound = () => {
  return (
    <section className={styles.section}>
      <h2 className={`${styles['light-digits']} text text_type_digits-large mb-15`}>404</h2>
      <h4 className='text text_type_main-medium mb-5'>Кажется, тут ничего нет...</h4>
      <h5 className='text text_type_main-medium mb-10'> Может стоит заказать ещё один бургер? </h5>
      <Link
        className='text text_type_main-medium text_color_primary'
        style={{textDecoration: 'none'}}
        to='/'
      >
        <Button htmlType='button' type='primary' size='large'>
          Вернуться к бургерам
        </Button>    
      </Link>
    </section>
  )
}

export default NotFound