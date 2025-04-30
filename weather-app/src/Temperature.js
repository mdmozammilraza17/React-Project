import "./Temperature.css";

export default function Temperature({ temp, city, country }) {
  console.log("Received props:", { temp, city, country });
  return (
    <div className="temperature-container">
      <div className="icon">🌤</div>
      <p className="temp-value">{temp} °C</p>
      <p className="location">
        {city}, {country}
      </p>
    </div>
  );
}
