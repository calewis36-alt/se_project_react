import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ clothingItems, handleOpenItemModal, weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type,
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is {weatherData.temperature[currentTemperatureUnit]}
        &deg;
        {currentTemperatureUnit} / You may want to wear:
      </p>
      <ul className="main__card-list">
        {filteredItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
