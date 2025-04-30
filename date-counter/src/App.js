import { useState, useEffect } from "react";
import "./index.css";

function App() {
  // State to keep track of the current time
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    // Set interval to update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      {/* Display the current time above the heading */}
      <h2 className="time-display">Current Time: {currentTime}</h2>

      <h1 className="heading">Welcome to Date Counter App</h1>

      <Counter />

      {/* Footer with your name */}
      <footer className="footer">
        <p>Maintained by Mozammil Raza</p>
      </footer>
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div className="counter-container">
      <div className="steps">
        <button className="btn" onClick={() => setStep((c) => c - 1)}>
          -
        </button>
        <p className="step-text">Step: {step}</p>
        <button className="btn" onClick={() => setStep((c) => c + 1)}>
          +
        </button>
      </div>

      <div className="steps">
        <button className="btn" onClick={() => setCount((c) => c - step)}>
          -
        </button>
        <p className="counter-text">Counter: {count}</p>
        <button className="btn" onClick={() => setCount((c) => c + step)}>
          +
        </button>
      </div>

      <p className="date-display">
        {count === 0 ? (
          <>
            Today is: <span className="red-text">{date.toString()}</span>
          </>
        ) : count > 0 ? (
          <>
            {Math.abs(count)} days from today will be:{" "}
            <span className="green-text">{date.toString()}</span>
          </>
        ) : (
          <>
            {Math.abs(count)} day ago from today was:{" "}
            <span className="blue-text">{date.toString()}</span>
          </>
        )}
      </p>
    </div>
  );
}

export default App;
