import Form from '../components/form/form'
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, FC, ChangeEvent, FormEvent } from 'react';
import AdditionalAction from '../components/additional-action/additional-action';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetPassword } from '../services/actions/reset-password';
import styles from './pages.module.css';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../utils/cookie';
import { RESET_PASSWORD_INITIAL_STATE } from '../constants/constants';

interface IFormState {
  password: string;
  token: string;
}

const ResetPassword: FC = () => {
  const [formState, setFormState] = useState<IFormState>(RESET_PASSWORD_INITIAL_STATE);
  const [passwordIsShown, setPasswordIsShown] = useState<boolean>(false);

  // TODO Временное решение пока не типизирован store
  // @ts-expect-error
  const userIsAuthorized = useSelector(state => state.userInformation.userIsAuthorized) as boolean;
  // @ts-expect-error
  const forgotPasswordRequest = useSelector(state => state.userInformation.forgotPasswordRequest) as boolean;

  const dispatch = useDispatch();

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  };

  const onIconClick = (): void => {
    setTimeout(() => passwordInputRef.current?.focus(), 0);
    setPasswordIsShown(!passwordIsShown);
  };

  const sendResetPasswordData = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // TODO Временное решение пока не типизирован store
    // @ts-expect-error
    dispatch(sendResetPassword(formState))
  }

  if (userIsAuthorized || getCookie('accessToken')) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  };

  if (!forgotPasswordRequest) {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password'
        }}
      />
    )
  };

  return (
    <section className={styles.section}>
      <Form
        formTitle={'Восстановление пароля'}
        formButtonText={'Сохранить'}
        formButtonClick={sendResetPasswordData}
      >
        <Input
          type={passwordIsShown ? 'text' : 'password'}
          placeholder={'Введите новый пароль'}
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
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          value={formState.token}
          name={'token'}
          error={false}
          ref={codeInputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />
      </Form>
      <AdditionalAction question={'Вспомнили пароль?'} buttonText={'Войти'} linkPath={'/login'} />
    </section>
  )
}

export default ResetPassword