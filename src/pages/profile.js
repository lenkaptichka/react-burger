import ProfileEditing from "../components/profile-editing/profile-editing";
import ProfileMenu from "../components/profile-menu/profile-menu";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from "../services/actions/user";
import { useEffect } from 'react';

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getUser());
    // dispatch(getUserWithCheckToken());
  }, []);



  return (
    <>
      <ProfileMenu />
      <ProfileEditing />
    </>

  )
}

export default Profile