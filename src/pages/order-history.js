import ProfileMenu from "../components/profile-menu/profile-menu";
import styles from './pages.module.css';


const OrderHistory = () => {
  return (
    <>
    <ProfileMenu />
    <div className={`${styles['order-history']} mt-30 ml-6`}>
      <h3 className='text text_type_main-medium'>Тут пока ничего нет, но скоро появится история заказов</h3>
      
    </div>
    </>
  )
}

export default OrderHistory