import styles from './form-page-wrapper.module.css';

const FormPageWrapper = ({children}) => {
  return (
    <section className={styles.section}>
      {children}
    </section>
  )
}

export default FormPageWrapper