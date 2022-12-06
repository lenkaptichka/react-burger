import styles from './modal-overlay.module.css';
import { useRef } from 'react';
import PropTypes from 'prop-types';

export default function ModalOverlay({ closeModal }) {
  const modalOverlayRef = useRef(null);

  const closeModalByClickOutside = (event) => {
    if (event.target === modalOverlayRef.current) {
      closeModal();
    }
  }

  return (
    <div className={styles['modal-overlay']} ref={modalOverlayRef} onClick={closeModalByClickOutside}></div>
  )
};

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired
};
