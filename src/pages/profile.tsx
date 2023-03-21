import ProfileEditing from '../components/profile-editing/profile-editing';
import ProfileMenu from '../components/profile-menu/profile-menu';
import { useSelector } from '../hooks/hooks';
import { Redirect } from 'react-router-dom';
import styles from './pages.module.css';
import { FC, useEffect } from 'react';

const Profile: FC = () => {
  const logoutRequest = useSelector(state => state.logout.logoutRequest);

  if (logoutRequest) {
    return (
      <div className={styles.section}>
        <h3 className='text text_type_main-medium'>Секунду...</h3>
      </div>
    );
  }

  return (
    <>
      <ProfileMenu />
      <ProfileEditing />
    </>
  )
}

export default Profile