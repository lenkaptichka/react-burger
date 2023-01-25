import styles from './form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, ReactNode, FormEvent } from 'react';

interface IFormProps {
  formTitle?: string;
  formButtonText?: string;
  formButtonClick?: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const Form: FC<IFormProps> = ({ formTitle, formButtonText, formButtonClick, children }) => {

  return (
    <div className={styles['form-wrapper']}>
      {formTitle ?
        <h2 className={`${styles.title} text text_type_main-medium`}>
          {formTitle}
        </h2> :
        null
      }
      <form onSubmit={formButtonClick} className={styles.form}>
        {children}
        {formButtonText ?
          <Button type='primary' htmlType='submit' size='medium' extraClass='mb-20' >
            {formButtonText}
          </Button> :
          null
        }
      </form>
    </div>
  )
}

export default Form
