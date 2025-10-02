import React, { useEffect, useState } from 'react'
import { fetchWeather, type WeatherData } from '../../apis/weatherApi'

interface Props {
  latitude?: number
  longitude?: number
}

export default function WeatherWidget({ latitude, longitude }: Props) {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      setCoords({ lat: latitude, lon: longitude })
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Geolocation error:", error)
        }
      )
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (coords) {
      fetchWeather(coords.lat, coords.lon)
        .then(setWeather)
        .catch(console.error)
    }
  }, [coords])

  if (!weather || !weather.weather?.length) {
    return <div className="widget">Loading weather...</div>
  }

  const weatherMain = weather.weather[0]?.main ?? 'N/A'
  const temp = weather.main?.temp ?? 0
  const humidity = weather.main?.humidity ?? 0

  return (
    <div className="widget weather-widget">
      <h3>
        Weather - {weather.name}, {weather.sys?.country ?? ''}
      </h3>
      <p>
        {weatherMain} - {Math.round(temp)}°C
      </p>
      <p>Humidity: {humidity}%</p>
    </div>
  )
}
