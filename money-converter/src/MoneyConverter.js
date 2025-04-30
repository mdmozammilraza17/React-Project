import { useEffect, useState } from "react";
import "./index.css";

export default function MoneyConverter() {
  const [amount, setAmount] = useState("");
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // In a real app, use process.env.REACT_APP_FIXER_API_KEY
    fetch(
      `https://data.fixer.io/api/latest?access_key=4418d9b71fd61badb15aec4f5524e50f`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setRates(data.rates);
        } else {
          throw new Error(data.error?.info || "Failed to load exchange rates");
        }
      })
      .catch((err) => {
        setError(err.message);
        console.error("Failed to fetch rates:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency] && amount) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      const result = amount * rate;
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount(null);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && !isNaN(value))) {
      setAmount(value);
    }
  };

  return (
    <div className="main">
      <h1>Currency Converter Application</h1>

      {error && <p className="error">{error}</p>}

      <label>Amount: </label>
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={handleAmountChange}
        min="0"
      />

      <div className="currency-selectors">
        <div className="convert">
          <label>From: </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            disabled={isLoading}
          >
            {Object.keys(rates).map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>

        <div className="convertTo">
          <label>To: </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            disabled={isLoading}
          >
            {Object.keys(rates).map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="result">
        {isLoading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Fetching exchange rates...</p>
          </div>
        ) : convertedAmount ? (
          <p>
            <strong>
              {amount} {fromCurrency} ={" "}
              <span className="converted-amount">
                {convertedAmount} {toCurrency}
              </span>
            </strong>
          </p>
        ) : (
          <p className="placeholder">Enter an amount to see the conversion</p>
        )}
      </div>

      <footer className="footer">
        <p>
          Maintained by <strong>Mozammil Raza</strong>
          <br />
          Email:{" "}
          <a href="mailto:mdmozammilraza06@gmail.com">
            mdmozammilraza06@gmail.com
          </a>
          <br />
          Contact: <a href="tel:+916205914390">6205914390</a>
        </p>
      </footer>
    </div>
  );
}
