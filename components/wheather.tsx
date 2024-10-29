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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 animate-wiggle">
        Check the Weather in Your City
      </h1>

      <form onSubmit={handleSubmit} className="p-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Please enter your city
          </label>
          <input
            className="w-full border border-pink-400 rounded-md p-2 focus:ring-2 focus:ring-pink-600"
            type="text"
            placeholder="City"
            value={city}
            onChange={cityOnChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-400 text-white py-2 my-2 rounded-md hover:bg-gray-400 transition cursor-pointer"
        >
          Submit
        </button>
      </form>

      <div className="mt-6">
        {errorMessage ? (
          <p className="text-red-500 text-center">{errorMessage}</p>
        ) : (
          weather && (
            <div className="mt-6 text-center">
              <h1 className="text-xl font-semibold">Name: {weather.name}</h1>
              <p className="text-lg">Temperature: {weather.main.temp}°C</p>
              <p className="text-lg">Humidity: {weather.main.humidity}%</p>
              <p className="text-lg">
                Description: {weather.weather[0].description}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
