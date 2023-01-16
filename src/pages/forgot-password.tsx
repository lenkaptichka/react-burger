
import Form from '../components/form/form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState, useRef, FC, ChangeEvent, FormEvent } from 'react';
import AdditionalAction from '../components/additional-action/additional-action';
import { useDispatch, useSelector } from 'react-redux';
import { sendForgotPassword } from '../services/actions/user';
import { Redirect } from 'react-router-dom';
import styles from './pages.module.css';
import { getCookie } from '../utils/cookie';
import { FORGOT_PASSWORD_INITIAL_STATE } from '../constants/constants';

const ForgotPassword: FC = () => {
  const [formState, setFormState] = useState<{email: string}>(FORGOT_PASSWORD_INITIAL_STATE);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // TODO Временное решение пока не типизирован store
  // @ts-expect-error
  const forgotPasswordRequest = useSelector(state => state.userInformation.forgotPasswordRequest) as boolean;
  // @ts-expect-error
  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized) as boolean;

  const dispatch = useDispatch();

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormState({...formState, [event.target.name]: event.target.value})
  };

  const sendEmail = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // TODO Исправить в следующем спринте
    // @ts-expect-error
    dispatch(sendForgotPassword(formState));
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

  if (forgotPasswordRequest) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    )
  };

  return (
    <section className={styles.section}>
      <Form
        formTitle={'Восстановление пароля'} 
        formButtonText={'Восстановить'}
        formButtonClick={sendEmail}
      >
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={onChange}
          value={formState.email}
          name={'email'}
          error={false}
          ref={emailInputRef}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />
      </Form>
      <AdditionalAction question={'Вспомнили пароль?'} buttonText={'Войти'} linkPath={'/login'} />
    </section>
  )
}

export default ForgotPassword