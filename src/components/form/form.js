import styles from './form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

const Form = ({ formTitle, formButtonText, formButtonClick, children }) => {
  return (
    <div className={styles['form-wrapper']}>
      {formTitle ?
        <h2 className={`${styles.title} text text_type_main-medium`}>
          {formTitle}
        </h2> :
        null
      }
      <form className={styles.form}>
        {children}
        {formButtonText ?
          <Button htmlType='button' type='primary' size='medium' extraClass='mb-20' onClick={formButtonClick}>
            {formButtonText}
          </Button> :
          null
        }
      </form>
    </div>
  )
}

export default Form