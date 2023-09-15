import { FaGithubAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import styles from './Footer.module.css'
const Footer = () => {
  return (
    <div className={styles.footer_container}>
      <Link className={styles.link} to='https://github.com/Gersuer' target='_blank'>
        <FaGithubAlt className={styles.icon} />
      </Link>
    </div>
  )
}

export default Footer