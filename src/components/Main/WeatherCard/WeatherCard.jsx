import { useContext } from "react";

import CurrentTemperatureUnitContext from "../../../contexts/CurrentTemperatureUnitContext";

import { weatherConditionsImages } from "../../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const timeOfDay = weatherData.isDay ? "day" : "night";

  return (
    <section className="weather-card">
      <img
        src={
          weatherConditionsImages[timeOfDay][weatherData.weatherCondition]
            ?.image || weatherConditionsImages[timeOfDay]["default"]?.image
        }
        alt={weatherData.condition}
        className="weather-card__image"
      />
      <p className="weather-card__temp">
        {weatherData.temperature[currentTemperatureUnit]}&deg;{" "}
        {currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
