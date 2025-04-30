import { useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar.js";
import Temperature from "./Temperature.js";
import WindHumidity from "./WindHumidity.js"; // ✅ Correct import

function App() {
  const [weather, setWeatherData] = useState(null);

  const handleWeatherData = (weatherData) => {
    setWeatherData(weatherData);
  };

  return (
    <div className="app-container">
      <video autoPlay loop muted className="background-video">
        <source src="/animation.mp4" type="video/mp4" />
      </video>

      <div className="main-body">
        <h1 style={{ color: "#fff" }}>Check Weather Now</h1>
        <SearchBar onWeatherData={handleWeatherData} />
        {weather && weather.main ? (
          <>
            <Temperature
              temp={weather.main.temp}
              city={weather.name}
              country={weather.sys.country}
            />
            <WindHumidity
              humidity={weather.main.humidity}
              windSpeed={weather.wind.speed}
            />
          </>
        ) : (
          <>
            <Temperature temp="NA" city="Unknown" country="Unknown" />
            <WindHumidity humidity="NA" windSpeed="NA" />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
