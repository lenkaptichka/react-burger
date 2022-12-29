import styles from './additional-action.module.css';
import { Input, Button, ShowIcon, HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useRouteMatch } from 'react-router-dom';

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
}

export default AdditionalAction