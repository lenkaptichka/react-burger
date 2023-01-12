import ProfileEditing from '../components/profile-editing/profile-editing';
import ProfileMenu from '../components/profile-menu/profile-menu';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from './pages.module.css';

const Profile = () => {
  const logoutRequest = useSelector(state => state.userInformation.logoutRequest);
  const logoutIsSuccess = useSelector(state => state.userInformation.logoutSuccess);

  if (logoutRequest) {
    return (
      <div className={styles.section}>
        <h3 className='text text_type_main-medium'>Секунду...</h3>
      </div>
    );
  }

  if (logoutIsSuccess) {
    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  };

  return (
    <>
      <ProfileMenu />
      <ProfileEditing />
    </>
  )
}

export default Profile