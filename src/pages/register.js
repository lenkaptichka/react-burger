import AdditionalAction from '../components/additional-action/additional-action'
import Form from '../components/form/form'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import { sendRegisterData } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import styles from './pages.module.css';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../utils/cookie';
import { REGISTER_INITIAL_STATE } from '../constants/constants';

const Register = () => {
  const [formState, setFormState] = useState(REGISTER_INITIAL_STATE);
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized);

  const dispatch = useDispatch();

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const sendRegister = (event) => {
    event.preventDefault();
    dispatch(sendRegisterData(formState));
  }

  const onChange = event => {
    setFormState({...formState, [event.target.name]: event.target.value})
  };

  const onIconClick = () => {
    setTimeout(() => passwordInputRef.current.focus(), 0);
    setPasswordIsShown(!passwordIsShown);
  };

  if (userIsAuthorized || getCookie('accessToken')) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  };

  return (
    <section className={styles.section}>
      <Form formTitle={'Регистрация'} formButtonText={'Зарегистрироваться'} formButtonClick={sendRegister}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={formState.name}
          name={'name'}
          error={false}
          ref={nameInputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={onChange}
          value={formState.email}
          name={'email'}
          error={false}
          ref={emailInputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />
        <Input
          type={passwordIsShown ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={onChange}
          value={formState.password}
          name={'password'}
          error={false}
          ref={passwordInputRef}
          icon={passwordIsShown ? 'HideIcon' : 'ShowIcon'}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />
      </Form>
      <AdditionalAction question={'Уже зарегистрированы?'} buttonText={'Войти'} linkPath={'/login'} />
    </section>
  )
}

export default Register