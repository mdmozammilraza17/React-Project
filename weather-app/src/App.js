import "./App.css";
import "./index.css";
import React, { useEffect } from "react";
import { useState } from "react";

function App() {
  const [weather, setWeather] = useState(null); // Initialize as null
  const [city, setCity] = useState("Pune");
  const [searchCity, setSearchCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add error state

  const fetchWeather = (cityName) => {
    if (!cityName || cityName.trim() === "") {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=b9e504bf1fe220c5b70d7167af7c765d&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found! Please try another location.");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setCity(data.name);
      })
      .catch((error) => {
        setError(error.message);
        setWeather(null); // Clear weather data on error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = () => {
    if (searchCity.trim() !== "") {
      fetchWeather(searchCity);
      setSearchCity("");
    }
  };

  return (
    <WeatherApp
      weather={weather}
      searchCity={searchCity}
      setSearchCity={setSearchCity}
      handleSearch={handleSearch}
      loading={loading}
      error={error}
    />
  );
}

function WeatherApp({
  weather,
  searchCity,
  setSearchCity,
  handleSearch,
  loading,
  error,
}) {
  return (
    <div className="app-container">
      <div className="main">
        <h1>Weather Application</h1>
        <label>
          <input
            type="text"
            placeholder="Enter city or pin code"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
          <span onClick={handleSearch}>🔍</span>
        </label>

        {loading && <p>Fetching weather data...</p>}

        {error && <div className="error-message">{error}</div>}

        {weather && !loading && !error && (
          <>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
            <p>
              {weather.name}, {weather.sys.country}
            </p>
            <p>{Math.round(weather.main.temp)} °C</p>
            <p>Feels like {Math.round(weather.main.feels_like)} °C</p>
            <p>
              {weather.weather[0].description.charAt(0).toUpperCase() +
                weather.weather[0].description.slice(1)}
            </p>
            <div className="humidity">
              <p>🌫️ Humidity - {weather.main.humidity} %</p>
              <p>💨 Wind - {weather.wind.speed} KMPH</p>
            </div>
          </>
        )}
      </div>

      <footer>
        <p>Maintained by Mozammil Raza</p>
        <p>Email: mdmozammilraza06@gmail.com</p>
        <p>Mobile No. 6205914390</p>
      </footer>
    </div>
  );
}

export default App;
