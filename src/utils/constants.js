const coordinates = { lat: 33.9576, lon: -118.267 };
const apiKey = "8eb48d7b97db48b290bb587e012e09e2";

const weatherConditionsImages = {
  day: {
    clear: {
      name: "clear",
      image: new URL("../assets/day/clear.png", import.meta.url).href,
    },

    clouds: {
      name: "clouds",
      image: new URL("../assets/day/cloudy.png", import.meta.url).href,
    },
    fog: {
      name: "fog",
      image: new URL("../assets/day/fog.png", import.meta.url).href,
    },
    rain: {
      name: "rain",
      image: new URL("../assets/day/rain.png", import.meta.url).href,
    },
    snow: {
      name: "snow",
      image: new URL("../assets/day/snow.png", import.meta.url).href,
    },
    storm: {
      name: "storm",
      image: new URL("../assets/day/storm.png", import.meta.url).href,
    },
    default: {
      name: "default",
      image: new URL("../assets/day/default.png", import.meta.url).href,
    },
  },

  night: {
    clear: {
      name: "clear",
      image: new URL("../assets/night/clear.png", import.meta.url).href,
    },
    clouds: {
      name: "clouds",
      image: new URL("../assets/night/cloudy.png", import.meta.url).href,
    },
    rain: {
      name: "rain",
      image: new URL("../assets/night/rain.png", import.meta.url).href,
    },
    snow: {
      name: "snow",
      image: new URL("../assets/night/snow.png", import.meta.url).href,
    },
    storm: {
      name: "storm",
      image: new URL("../assets/night/storm.png", import.meta.url).href,
    },
    default: {
      name: "default",
      image: new URL("../assets/night/default.png", import.meta.url).href,
    },
  },
};

export { coordinates, apiKey, weatherConditionsImages };
