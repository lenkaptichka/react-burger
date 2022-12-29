import Form from "../components/form/form"
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import AdditionalAction from "../components/additional-action/additional-action";
import FormPageWrapper from "../components/form-page-wrapper/form-page-wrapper";
import { useDispatch } from 'react-redux';
import { sendResetPassword } from '../services/actions/user';
import styles from './pages.module.css';

const ResetPassword = () => {
  const [form, setValue] = useState({password: '', token: ''});
  const [passwordIsShown, setPasswordIsShown] = useState(false);

  const dispatch = useDispatch();

  const passwordInputRef = useRef(null);
  const codeInputRef = useRef(null);

  const onChange = event => {
    setValue({...form, [event.target.name]: event.target.value})
  };

  const onIconClick = () => {
    setTimeout(() => passwordInputRef.current.focus(), 0);
    setPasswordIsShown(!passwordIsShown);
  }

  return (
    <section className={styles.section}>
      <Form
        formTitle={'Восстановление пароля'}
        formButtonText={'Сохранить'}
        formButtonClick={() => dispatch(sendResetPassword(form))}
      >
      <Input
          type={passwordIsShown ? 'text' : 'password'}
          placeholder={'Введите новый пароль'}
          onChange={onChange}
          value={form.password}
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
          value={form.token}
          name={'token'}
          error={false}
          ref={codeInputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass='mb-6'
        />
      </Form>
      <AdditionalAction question={'Вспомнили пароль?'} buttonText={'Войти'} linkPath={'/login'}/>
    </section>
  )
}

export default ResetPassword