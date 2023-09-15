import styles from './Home.module.css'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className={styles.home_container}>
      <div className={styles.title_container}>
        <h1>Weather App</h1>
      </div>
      <div className={styles.get_start_button_container}>
        <Link to='search'>
          <button>Get Start</button>
        </Link>
      </div>
    </div>
  )
}

export default Home