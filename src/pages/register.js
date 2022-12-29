import AdditionalAction from "../components/additional-action/additional-action"
import Form from "../components/form/form"
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from 'react';
import { sendRegisterData } from "../services/actions/user";
import { useDispatch } from 'react-redux';
import styles from './pages.module.css';

const Register = () => {
  const [form, setValue] = useState({email: '', password: '', name: ''});
  const [passwordIsShown, setPasswordIsShown] = useState(false);

  const dispatch = useDispatch();

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);


  const onChange = event => {
    setValue({...form, [event.target.name]: event.target.value})
  };

  const onIconClick = () => {
    setTimeout(() => passwordInputRef.current.focus(), 0);
    setPasswordIsShown(!passwordIsShown);
  }

  return (
    <section className={styles.section}>
      <Form formTitle={'Регистрация'} formButtonText={'Зарегистрироваться'} formButtonClick={() => dispatch(sendRegisterData(form))}>
      {/* <Form formTitle={'Регистрация'} formButtonText={'Зарегистрироваться'}  formButtonClick={() => console.log(JSON.stringify(form))}> */}
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          value={form.name}
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
          value={form.email}
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
      </Form>
      <AdditionalAction question={'Уже зарегистрированы?'} buttonText={'Войти'} linkPath={'/login'} />
    </section>
  )
}

export default Register