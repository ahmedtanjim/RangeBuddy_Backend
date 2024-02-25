import styles from "../../styles/Header.module.css"
import Link from "next/link"
export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.headerLink}>Range Buddy</div>
      </Link>
      <div>
        <img className={styles.logo} src="/favicon.ico" />
      </div>
    </div>
  )
}
