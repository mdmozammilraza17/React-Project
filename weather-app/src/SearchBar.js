import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onWeatherData }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchWeather = async () => {
    try {
      const apiKey = "b9e504bf1fe220c5b70d7167af7c765d";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      onWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCitySuggestions = async (searchText) => {
    if (!searchText) return;
    try {
      const apiKey = "b9e504bf1fe220c5b70d7167af7c765d"; // same key if geocoding enabled
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${searchText}&limit=5&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setCity(input);
    if (input.length > 2) {
      fetchCitySuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (selectedCity) => {
    setCity(selectedCity);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
    setCity("");
    setSuggestions([]);
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="text"
          placeholder="Enter city or pin code"
          className="entercity"
          value={city}
          onChange={handleChange}
        />
        <button type="submit" className="search-bar">
          🔍 Search
        </button>
      </form>

      {/* Dropdown Suggestions */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => handleSuggestionClick(item.name)}>
              {item.name}, {item.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
