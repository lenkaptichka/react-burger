import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, FC, ChangeEvent, FormEvent } from 'react';
import AdditionalAction from '../components/additional-action/additional-action';
import Form from '../components/form/form';
import { useDispatch, useSelector } from '../hooks/hooks';
import { SET_PASSWORD } from '../services/actions/user';
import { sendLoginData } from '../services/actions/login';
import { Redirect, useLocation } from 'react-router-dom';
import styles from './pages.module.css';
import { getCookie } from '../utils/cookie';
import { LOGIN_INITIAL_STATE } from '../constants/constants';

interface IFormState {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [formState, setFormState] = useState<IFormState>(LOGIN_INITIAL_STATE)
  const [passwordIsShown, setPasswordIsShown] = useState<boolean>(false);

  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized);
  const loginFailed = useSelector(state => state.login.loginFailed);

  const dispatch = useDispatch();
  const location = useLocation<{from: string}>();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormState({...formState, [event.target.name]: event.target.value});
  };

  const sendLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch({
      type: SET_PASSWORD,
      password: formState.password
    });
    dispatch(sendLoginData(formState))
  };

  if (userIsAuthorized || getCookie('accessToken')) {
    return (
      <Redirect
        to={location.state?.from || '/'}
      />
    )
  };

  const onIconClick = (): void => {
    setTimeout(() => passwordInputRef.current?.focus(), 0)
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
          value={formState.email}
          name={'email'}
          ref={emailInputRef}
          
          size={'default'}
          extraClass='mb-6'
        />
        <Input
          type={passwordIsShown ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={onChange}
          value={formState.password}
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