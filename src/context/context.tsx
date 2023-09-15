import { useState, createContext, ReactNode } from "react"; import axios from "axios";

interface ChildrenProps {
    children: ReactNode
}
interface CityProps {
    city: string
}

interface Dataprops {
    name: string
    weather: string
    wind: number
    humidity: number
    temp: number
    day: string,
}

interface CityContextProps {
    loading: boolean
    erro: boolean
    erroMessage: string
    searchData: (city: CityProps) => Promise<void>
    data: Dataprops | null
    mapLocation: string

}

export const WeatherContext = createContext({} as CityContextProps);

function WeatherProvider({ children }: ChildrenProps) {
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState(false);
    const [erroMessage, setErroMessage] = useState('');
    const [data, setData] = useState<Dataprops | null>(null);
    const [mapLocation, setMapLocation] = useState<string>('')


    async function searchData(city: CityProps) {
        if (!city) {
            alert('É necessário digitar um local');
            return
        }
        setMapLocation(`https://www.google.com.br/maps/place/${city}`)
        setLoading(true);
        const day = new Date().toDateString()
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=332a662da702e7898563d0ecb0a9bd66`;
        await axios.get(url)
            .then(resp => {
                console.log(resp.data.weather[0].main)
                const dados: Dataprops = {
                    name: resp.data.name,
                    weather: resp.data.weather[0].main,
                    wind: resp.data.wind.speed,
                    humidity: resp.data.main.humidity,
                    temp: Math.floor(Number(resp.data.main.temp) - 273.15),
                    day: day,
                }
                setData(dados)
                setLoading(false);
                setErro(false)
            }).catch(err => {
                console.log('entrou aqui')
                setErro(true)
                console.log(err.response.data.message)
                setErroMessage(err.response.data.message)
                setLoading(false);
            });
    }

    return (
        <WeatherContext.Provider value={{
            searchData,
            data,
            loading,
            erro,
            erroMessage,
            mapLocation
        }}>
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherProvider;