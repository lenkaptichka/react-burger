import styles from './form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Form = ({ formTitle, formButtonText, formButtonClick, children }) => {

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

Form.propTypes = {
  formTitle: PropTypes.string,
  formButtonText: PropTypes.string,
  formButtonClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default Form
