import styles from './Spinner.module.css'

export default function Spinner() {
  return (
    <div className={styles['spin-wrapper']}>
      <div className={styles.spin}></div>
    </div>
  )
}
