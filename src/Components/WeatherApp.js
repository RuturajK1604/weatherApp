import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "./Images/search.png";
import clear_icon from "./Images/clear.png";
import drizzle_icon from "./Images/drizzle.png";
import rain_icon from "./Images/rain.png";
import snow_icon from "./Images/snow.png";
import cloud_icon from "./Images/cloud.png";
import humidity_icon from "./Images/humidity.png";
import wind_icon from "./Images/wind.png";

export const WeatherApp = () => {
  let API_KEY = ""; // NEED TO CREATE PERSONAL API KEY FROM OPENWEATHER.COM

  const [cityName, setCityName] = useState("");

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
  };

  const setData = (data) => {
    const location = document.querySelector(".weather-location");
    const temprature = document.querySelector(".weather-temp");
    const humidity = document.querySelector(".weather-humidity");
    const windspeed = document.querySelector(".weather-windspeed");
    const image = document.querySelector(".weather-image");
    console.dir(image);
    location.innerText = data.name;
    temprature.innerText = `${data.main.temp}° C`;
    humidity.innerText = `${data.main.humidity}%`;
    windspeed.innerText = `${data.wind.speed}m/h`;
    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      image.children[0].src = clear_icon;
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n" ||
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n" ||
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      image.children[0].src = rain_icon;
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      image.children[0].src = drizzle_icon;
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n" ||
      data.weather[0].icon === "11d" ||
      data.weather[0].icon === "11n"
    ) {
      image.children[0].src = rain_icon;
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n" ||
      data.weather[0].icon === "50d" ||
      data.weather[0].icon === "50n"
    ) {
      image.children[0].src = snow_icon;
    } else {
      image.children[0].src = clear_icon;
    }
  };

  const getWeatherResponse = async () => {
    if (cityName === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    setData(data);
  };

  return (
    <div className="container">
      <div className="searchbar">
        <input
          className="cityName"
          value={cityName}
          onChange={handleCityNameChange}
          type="text"
          placeholder="Search here"
        ></input>
        <div className="search-icon" onClick={getWeatherResponse}>
          <img alt="search-icon" src={search_icon}></img>
        </div>
      </div>
      <div className="weather-image">
        <img alt="cloud-icon" src={cloud_icon}></img>
      </div>
      <div className="weather-data">
        <div className="weather-temp">24°C</div>
        <div className="weather-location">London</div>
      </div>
      <div className="data-container">
        <div className="element">
          <img alt="humidity-icon" src={humidity_icon} className="icon"></img>
          <div className="data">
            <div className="weather-humidity">4%</div>
            <div className="info">Humidity percentage</div>
          </div>
        </div>
        <div className="element">
          <img alt="wind-icon" src={wind_icon} className="icon"></img>
          <div className="data">
            <div className="weather-windspeed">15 m/h</div>
            <div className="info">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};
