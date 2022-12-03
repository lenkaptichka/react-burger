import styles from './modal.module.css';
import{ CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

export default function Modal({title, children, closeModal}) {
  useEffect(() => {
    document.addEventListener('keydown', closeModalByPressingEsc);

    return () => document.removeEventListener('keydown', closeModalByPressingEsc);
  }, []);

  const closeModalByPressingEsc = (event) => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };
  return createPortal(
    <>
      <div className={`${styles.modal} pt-10 pl-10 pr-10`}>
        <div className={styles.header}>
          {title && <h5 className={`${styles.title} text text_type_main-large`}>{title}</h5>}
          <CloseIcon type="primary" onClick={closeModal} />
        </div>
        {children}
      </div>
    </>, document.getElementById('react-modals')
  )
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};
