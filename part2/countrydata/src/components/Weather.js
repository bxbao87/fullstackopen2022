import { useState, useEffect } from "react"
import axios from "axios"

const api_key = process.env.REACT_APP_WEATHER_KEY

const Weather = ({latlng, capital}) => {
    const [weather, setWeather] = useState(null)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`

    useEffect(()=>{
        axios.get(url)
        .then(response => {
          console.log("weather", response.data)
          setWeather(response.data)
        })
        // eslint-disable-next-line
    }, [])

    if (!weather)
        return null

    let iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    return (
        <div>
            <h1>Weather in {capital}</h1>
            <div>Temperature {weather.main.temp} Celcius</div>
            <img src={iconUrl} alt={weather.weather[0].description} />
            <div>Wind {weather.wind.speed} m/s</div>
        </div>
    )
}

export default Weather