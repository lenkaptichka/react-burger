import styles from './modal-overlay.module.css';
import { useRef } from 'react';
import PropTypes from 'prop-types';

export default function ModalOverlay({ children, closeModal }) {
  const modalOverlayRef = useRef(null);

  const closeModalByClickOutside = (event) => {
    if (event.target === modalOverlayRef.current) {
      closeModal();
    }
  }

  return (
    <div
      className={styles['modal-overlay']}
      ref={modalOverlayRef}
      onClick={closeModalByClickOutside}
    >{children}</div>
  )
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired
};
