import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, useEffect } from 'react';
import Form from '../form/form';
import styles from './profile-editing.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateUser, SET_PASSWORD } from '../../services/actions/user';
import { PROFILE_EDITING_INITIAL_STATE } from '../../constants/constants';

const ProfileEditing = () => {
  const userData = useSelector(state => state.userInformation.userData);
  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized);
  const userPassword = useSelector(state => state.userInformation.userPassword);
  const [formState, setFormState] = useState(PROFILE_EDITING_INITIAL_STATE);
  const [formIsChanged, setFormIsChanged] = useState(false);

  const dispatch = useDispatch();

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [nameInputIsActive, setNameInputIsActive] = useState(false);
  const [emailInputIsActive, setEmailInputIsActive] = useState(false);
  const [passwordInputIsActive, setPasswordInputIsActive] = useState(false);

  useEffect(() => {
    setFormState({
      name: userData?.name || '',
      email: userData?.email || '',
      password: userPassword || ''
    })
  }, [userData, userPassword]);


  const onChange = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
    dispatch({
      type: SET_PASSWORD,
      password: formState.password
    })
    setFormIsChanged(true);
  };

  const onNameIconClick = () => {
    setTimeout(() => nameInputRef.current.focus(), 0);
    setNameInputIsActive(true);
  };
  const onEmailIconClick = () => {
    setTimeout(() => emailInputRef.current.focus(), 0);
    setEmailInputIsActive(true);
  };
  const onPasswordIconClick = () => {
    setTimeout(() => passwordInputRef.current.focus(), 0);
    setPasswordInputIsActive(true);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser(formState));
    setFormIsChanged(false);
  };

  const resetEditing = () => {
    setFormState({
      ...formState,
      name: userData?.name ? userData.name : '',
      email: userData?.email ? userData.email : ''
    });
    setFormIsChanged(false);
  };

  if (!userIsAuthorized) {
    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  };

  return (
    <div className={`${styles['profile-editing']} mt-30`}>
      <Form>
        <Input
          type={'text'}
          disabled={!nameInputIsActive}
          placeholder={'Имя'}
          onChange={onChange}
          value={formState.name}
          name={'name'}
          error={false}
          ref={nameInputRef}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          onIconClick={onNameIconClick}
          extraClass='mb-6'
          onBlur={() => setNameInputIsActive(false)}
        />
        <Input
          type={'email'}
          disabled={!emailInputIsActive}
          placeholder={'E-mail'}
          onChange={onChange}
          value={formState.email}
          name={'email'}
          error={false}
          ref={emailInputRef}
          errorText={'Ошибка'}
          size={'default'}
          icon={'EditIcon'}
          onIconClick={onEmailIconClick}
          extraClass='mb-6'
          onBlur={() => setEmailInputIsActive(false)}
        />
        <Input
          type={'password'}
          disabled={!passwordInputIsActive}
          placeholder={'Пароль'}
          onChange={onChange}
          value={formState.password}
          name={'password'}
          error={false}
          ref={passwordInputRef}
          icon={passwordInputIsActive ? 'CloseIcon' : 'EditIcon'}
          errorText={'Ошибка'}
          size={'default'}
          onIconClick={onPasswordIconClick}
          extraClass='mb-6'
          onBlur={() => setPasswordInputIsActive(false)}
        />
      </Form>
      <div className={styles.buttons}>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          disabled={!formIsChanged}
          extraClass={`${styles['cancel-button']} mr-7`}
          onClick={resetEditing}
        >
          Отмена
        </Button>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          disabled={!formIsChanged}
          onClick={formSubmit}
          >
            Сохранить
          </Button>
      </div>
    </div>
  )
}

export default ProfileEditing