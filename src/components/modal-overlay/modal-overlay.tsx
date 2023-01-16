import styles from './modal-overlay.module.css';
import { FC, useRef, MouseEvent } from 'react';

interface IModalOverlayProps {
  closeModal: () => void
}

const ModalOverlay: FC<IModalOverlayProps> = ({ closeModal }) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const closeModalByClickOutside = (event: MouseEvent<HTMLDivElement>): void => {
    if (event.target === modalOverlayRef.current) {
      closeModal();
    }
  }

  return (
    <div className={styles['modal-overlay']} ref={modalOverlayRef} onClick={closeModalByClickOutside}></div>
  )
};

export default ModalOverlay