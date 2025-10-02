import axios from 'axios'

const API_KEY = '682e14a5ca984606d9cd665057272042'

export interface WeatherData {
  weather: { main: string }[]
  main: { temp: number; humidity: number }
  name: string
  sys: { country: string }
}

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  console.log("till here?")
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    console.log(url, "API URL")
  const response = await axios.get(url);
    console.log(response, "weather RESP")

  return response.data
}
