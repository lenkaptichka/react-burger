
import Form from '../components/form/form';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import AdditionalAction from '../components/additional-action/additional-action';
import { useDispatch, useSelector } from 'react-redux';
import { sendForgotPassword } from '../services/actions/user';
import { Redirect } from 'react-router-dom';
import styles from './pages.module.css';
import { getCookie } from '../utils/cookie';

const ForgotPassword = () => {
  const [form, setValue] = useState({email: ''});
  const emailInputRef = useRef(null);

  const forgotPasswordRequest = useSelector(state => state.userInformation.forgotPasswordRequest);
  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized);

  const dispatch = useDispatch();

  const onChange = event => {
    setValue({...form, [event.target.name]: event.target.value})
  };

  const sendEmail = (event) => {
    event.preventDefault();
    dispatch(sendForgotPassword(form));
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
          value={form.email}
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