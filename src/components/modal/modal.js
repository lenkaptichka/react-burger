import styles from './modal.module.css';
import{ CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useParams, useHistory } from 'react-router-dom';



export default function Modal({title, children, closeModal}) {
  const { id } = useParams();
  const history = useHistory();
  console.log('id', id);


  useEffect(() => {
    const closeModalByPressingEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', closeModalByPressingEsc);
        
    return () => document.removeEventListener('keydown', closeModalByPressingEsc);
  }, []);

  const closeModalNew = () => {
    console.log('history', history);
    // event.stopPropagation();
    console.log('closeModal');
    history.push("/");
  }

  return createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
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
  closeModal: PropTypes.func,
};
