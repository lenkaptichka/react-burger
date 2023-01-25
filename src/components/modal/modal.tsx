import styles from './modal.module.css';
import{ CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { FC, ReactNode } from 'react'

interface IModalProps {
  title?: string;
  children: ReactNode,
  closeModal: () => void,
}

const Modal: FC<IModalProps> = ({title, children, closeModal}) => {
  useEffect(() => {
    const closeModalByPressingEsc = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', closeModalByPressingEsc);
        
    return () => document.removeEventListener('keydown', closeModalByPressingEsc);
  }, []);

  return createPortal(
    <>
      <ModalOverlay closeModal={closeModal} />
      <div className={`${styles.modal} pt-10 pl-10 pr-10`}>
        <div className={styles.header}>
          {title && <h5 className={`${styles.title} text text_type_main-large`}>{title}</h5>}
          <CloseIcon type='primary' onClick={closeModal} />
        </div>
        {children}
      </div>
    </>, document.getElementById('react-modals')!
  )
};

export default Modal
