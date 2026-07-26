import { apiKey, coordinates } from "./constants";

export function getWeatherData() {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${apiKey}`,
  )
    .then((res) => {
      return res.ok
        ? res.json()
        : Promise.reject(`Error from weather API: ${res.status}`);
    })
    .then((data) => {
      return parseWeatherData(data);
    });
}

function parseWeatherData(data) {
  const parsedData = { temperature: {} };
  const timestamp = Date.now();

  function getWeatherCondition(temperature) {
    if (temperature >= 86) {
      return "hot";
    } else if (temperature >= 66) {
      return "warm";
    } else {
      return "cold";
    }
  }

  parsedData.city = data.name;
  parsedData.temperature.F = Math.round(data.main.temp);
  parsedData.temperature.C = Math.round(((data.main.temp - 32) * 5) / 9);
  parsedData.type = getWeatherCondition(parsedData.temperature.F);
  parsedData.weatherCondition = data.weather[0].main.toLowerCase();
  parsedData.isDay = isDay(data.sys, timestamp);

  return parsedData;
}

function isDay({ sunrise, sunset }, timestamp) {
  const timestampInSeconds = timestamp / 1000;
  return sunrise < timestampInSeconds && timestampInSeconds < sunset;
}
