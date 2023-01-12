import styles from './additional-action.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdditionalAction = ({question, buttonText, linkPath}) => {
  return (
    <div className={`${styles['additional-action']} mb-4`}>
      <h5 className={`${styles.question} text text_type_main-default text_color_inactive mr-2`}>
        {question}
      </h5>
      <Link to={linkPath}>
        <Button htmlType='button' type='secondary' size='large' extraClass={styles.button}>
          {buttonText}
        </Button>
      </Link>
    </div>
  )
};

AdditionalAction.propTypes = {
  question: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  linkPath: PropTypes.string.isRequired,
};

export default AdditionalAction