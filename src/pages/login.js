import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import AdditionalAction from '../components/additional-action/additional-action';
import Form from '../components/form/form';
import { useDispatch, useSelector } from 'react-redux';
import { sendLoginData, SET_PASSWORD } from '../services/actions/user';
import { Redirect } from 'react-router-dom';
import styles from './pages.module.css';

const Login = () => {
  const [form, setValue] = useState({email: '', password: ''})
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized);
  const loginFailed = useSelector(state => state.userInformation.loginFailed);

  const dispatch = useDispatch();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const onChange = event => {
    setValue({...form, [event.target.name]: event.target.value});
  };

  const sendLogin = (event) => {
    event.preventDefault();
    dispatch({
      type: SET_PASSWORD,
      password: form.password
    });
    dispatch(sendLoginData(form))
  }

  if (userIsAuthorized) {
    console.log({userIsAuthorized});
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  }

  const onIconClick = () => {
    setTimeout(() => passwordInputRef.current.focus(), 0)
    setPasswordIsShown(!passwordIsShown);
  }

  return (
    <section className={styles.section}>
      <Form
        formTitle={'Вход'}
        formButtonText={'Войти'}
        formButtonClick={sendLogin}
      >
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={onChange}
          value={form.email}
          name={'email'}
          ref={emailInputRef}
          
          size={'default'}
          extraClass='mb-6'
        />
        <Input
          type={passwordIsShown ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={onChange}
          value={form.password}
          name={'password'}
          error={!!loginFailed}
          ref={passwordInputRef}
          icon={passwordIsShown ? 'HideIcon' : 'ShowIcon'}
          onIconClick={onIconClick}
          errorText={'Что-то пошло не так'}
          size={'default'}
          extraClass='mb-6'
        />
      </Form>

      <AdditionalAction question={'Вы — новый пользователь?'} buttonText={'Зарегистрироваться'} linkPath={'/register'} />
      <AdditionalAction question={'Забыли пароль?'} buttonText={'Восстановить пароль'} linkPath={'/forgot-password'} />
    </section>
  )
}

export default Login;