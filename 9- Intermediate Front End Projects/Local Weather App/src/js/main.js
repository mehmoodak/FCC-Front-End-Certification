"use strict";

function capitalize(string) {
  return string.replace(/\b\w/g, function (l) {
    return l.toUpperCase()
  })
}

function showNavigationError() {
  document.querySelector(".loading").innerHTML = 'Sorry! we are unable to show the weather.';
}

function checkLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather, showNavigationError);
  } else {
    showNavigationError();
  }
}

function getWeather(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  console.log(`Longitude: ${longitude}, Latitude: ${latitude}`);
  fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`)
      .then(response => response.json())
      .then(data => insertWeather(data));
}

function insertWeather(data) {
  let weather_icon = data.weather[0].icon;
  let description = capitalize(data.weather[0].description);
  let temperature = data.main.temp;
  let temperature_min = data.main.temp_min;
  let temperature_max = data.main.temp_max;
  let pressure = data.main.pressure;
  let humidity = data.main.humidity;
  let location = data.name + ", " + data.sys.country;

  if (weather_icon && description && temperature && temperature_min && temperature_max && pressure && humidity && location) {
    document.querySelector(".loading").style.display = 'none';
    document.querySelector(".weather-info").style.display = 'block';

    document.querySelector('#location').innerHTML = location;
    document.querySelector('#temperature').innerHTML = temperature;
    document.querySelector('#description').innerHTML = description;
    document.querySelector('#temp-min').innerHTML = temperature_min;
    document.querySelector('#temp-max').innerHTML = temperature_max;
    document.querySelector('#pressure').innerHTML = pressure;
    document.querySelector('#humidity').innerHTML = humidity;
    document.querySelector('#icon').setAttribute('src', weather_icon);
  } else {
    document.querySelector(".loading").innerHTML = 'Sorry! some problem is occurred while showing weather. Please Try Again.';
  }

}

function convertTemperature(value, new_unit) {
  if (new_unit === 'celsius') {
    value = (value - 32) * (5 / 9);
  } else if (new_unit === 'farenheit') {
    value = (value * (9 / 5)) + 32;
  }
  return value;
}

function changeElementsText(selector, newText) {
  let elements = document.getElementsByClassName(selector);
  for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = newText;
  }
}

function changeUnits(old_unit, old_unit_entity, new_unit_entity) {
  document.getElementById('convert-weather').setAttribute('data-unit', old_unit);
  changeElementsText('temperature-unit', new_unit_entity);
  changeElementsText('temperature-unit-alternative', old_unit_entity);
}

document.getElementById('convert-weather').addEventListener('click', function (e) {
  let farenheit_entity = '&#x2109;';
  let celsius_entity = '&#8451;';

  let new_unit = document.getElementById('convert-weather').getAttribute('data-unit');
  let temperature = document.getElementById('temperature').innerHTML;
  let temperature_min = document.getElementById('temp-min').innerHTML;
  let temperature_max = document.getElementById('temp-max').innerHTML;

  document.getElementById('temperature').innerHTML = convertTemperature(temperature, new_unit);
  document.getElementById('temp-min').innerHTML = convertTemperature(temperature_min, new_unit);
  document.getElementById('temp-max').innerHTML = convertTemperature(temperature_max, new_unit);

  if (new_unit === 'celsius') {
    changeUnits('farenheit', farenheit_entity, celsius_entity);
  } else if (new_unit === 'farenheit') {
    changeUnits('celsius', celsius_entity, farenheit_entity);
  }
})

checkLocation();
