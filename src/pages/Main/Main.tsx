import Footer from '../../components/footer/Footer'
import styles from './Main.module.css'
import { AiOutlineSearch } from 'react-icons/ai'
import location_icon from '../../assets/location_icon.png'
import umidity from '../../assets/umidity.png'
import wind from '../../assets/wind.png'
import { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../../context/context'
import rainy from '../../assets/Rainy.png'
import suny from '../../assets/suny.png'
import cloudy from '../../assets/cloudy.png'
import thunder from '../../assets/thunder.png'
import snowing from '../../assets/snowing.png'
import { Link } from 'react-router-dom'

const Main = () => {
  const { searchData, data, loading, erro, erroMessage, mapLocation } = useContext(WeatherContext);
  const [city, SetCity] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (data?.weather == 'Clouds') {
      setIcon(cloudy);
    }
    if (data?.weather == 'Rain') {
      setIcon(rainy);
    }
    if (data?.weather == 'Snow') {
      setIcon(snowing);
    }
    if (data?.weather == 'Clear') {
      setIcon(suny);
    }
    if (data?.weather == 'Thunderstorm') {
      setIcon(thunder);
    }
    if (data?.weather == 'Mist') {
      setIcon(cloudy);
    }
  }, [data])


  if (erro) {
    return (
      <div className={styles.main_container}>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder='Digite um local'
            onChange={(e) => SetCity(e.target.value)}
          />
          <button onClick={() => searchData(city)}>
            <AiOutlineSearch className={styles.icon} />
          </button>
        </div>
        <div className={styles.weather_container}>
          {erro ? (<h1> Erro: {erroMessage} </h1>) : ('')}
        </div>
        <Footer />
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styles.main_container}>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder='Digite um local'
            onChange={(e) => SetCity(e.target.value)}
          />
          <button onClick={() => searchData(city)}>
            <AiOutlineSearch className={styles.icon} />
          </button>
        </div>
        <div className={styles.weather_container}>
          {loading ? (<div className={styles.loader}></div>) : ('')}
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.input_container}>
        <input
          type="text"
          placeholder='Ex: nome da sua cidade'
          onChange={(e) => SetCity(e.target.value)}
        />
        <button onClick={() => searchData(city)}>
          <AiOutlineSearch className={styles.icon} />
        </button>
      </div>
      <div className={styles.weather_container}>
        {erro ? (<h1> Erro: {erroMessage} </h1>) : ('')}
        {data &&
          <div className={styles.weather_info}>
            <div className={styles.city}>
              <span>{data?.name}</span>
              <Link to={mapLocation} target='_blank'>
                <img className={styles.location_icon} src={location_icon} alt="location_pin" />
              </Link>
            </div>
            <div className={styles.weather}>
              <img src={icon} alt="" />
            </div>
            <div className={styles.weather_name_temp_day}>
              <span className={styles.weather_name}>{data?.weather}</span>
              <span className={styles.weather_temp} >{data?.temp}°</span>
              <span className={styles.weather_day}>{data?.day}</span>
            </div>
            <div className={styles.low_info}>

              <div className={styles.other}>
                <div className={styles.other_info}>
                  <img src={umidity} alt="Umidity_icon" />
                  <span>Humidity</span>
                </div>
                <div className={styles.value}>{data?.humidity}%</div>
              </div>

              <div className={styles.other}>
                <div className={styles.other_info}>
                  <img src={wind} alt="wind_icon" />
                  <span>WindSpeed</span>
                </div>
                <div className={styles.value}>
                  {Math.floor(data?.wind * 3.6)} km/h
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <Footer />
    </div >
  )
}

export default Main