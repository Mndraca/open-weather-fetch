import { getData } from "@/lib/api";
import { useState } from "react";
import { WeatherData } from "./interface";

export function WeatherForm() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function fetchedWeather(cityName: string) {
    setWeather(null);
    setErrorMessage(null);

    const apiKey = `28ea277ec85c4de9e9607ef232a2aefe`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    const result = await getData(url);
    console.log(result);

    if (result.cod === "404") {
      setErrorMessage("City not found.");
    } else {
      setWeather(result);
    }
  }

  const cityOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (city) {
      fetchedWeather(city);
    }
  };

  return (
    <>
      <h1>Check the Weather in Your City</h1>
      <form onSubmit={handleSubmit}>
        <label>Please enter your</label>
        <input
          style={{
            border: "1px solid black",
            padding: "5px 10px",
            margin: "5%",
          }}
          type="text"
          placeholder="City"
          value={city}
          onChange={cityOnChange}
        />
        <button
          type="submit"
          style={{ border: "1px solid black", padding: "5px 10px" }}
        >
          Submit
        </button>
        <div>
          {errorMessage ? (
            <p style={{ color: "red" }}>{errorMessage}</p>
          ) : (
            weather && (
              <div>
                <h1>Name: {weather.name}</h1>
                <h1>Temperature: {weather.main.temp}°C</h1>
                <h1>Humidity: {weather.main.humidity}%</h1>
                <h1>Description: {weather.weather[0].description}</h1>
              </div>
            )
          )}
        </div>
      </form>
    </>
  );
}
