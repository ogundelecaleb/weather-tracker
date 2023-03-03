//******* fetch weather api ********//
let apiKey = "1ff9bd25a42ffb466acd88e1710b9182";

function callWeatherApi(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      showWaetherApi(data);
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again",
      });
      console.log(error);
    });
}

callWeatherApi("lagos");

//******* show weather api data ********//
const leftSide = document.querySelector(".left-side");
// https://openweathermap.org/img/wn/021.png

function showWaetherApi(data) {
  if (data) {
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { humidity, temp } = data.main;
    const { speed } = data.wind;

    leftSide.innerHTML = `
      <h1>weather in ${name}</h1>
      <div class="temp">
        <i class='bx bxs-thermometer'></i>
        ${temp}°C
      </div>
      <div class="icon-desc">
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="">
        <div>${description}</div>
      </div>
      <div>
        <i class='bx bx-droplet'></i>
        humidity: ${humidity} %
      </div>
      <div>
        <i class='bx bx-wind'></i>
        wind speed: ${speed} km/h
      </div>
    `;
  }
}

//******* search city ********//
const searchButton = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box Input");

searchButton.addEventListener("click", () => {
  let inputValue = searchInput.value;
  if (inputValue) {
    callWeatherApi(inputValue);
  } else {
    Swal.fire({
      icon: "info",
      title: "City Name!?",
      text: "please enter the city name",
    });
  }
});

searchInput.addEventListener("keyup", (e) => {
  let inputValue = searchInput.value;
  if (inputValue) {
    e.key == "Enter" && callWeatherApi(inputValue);
  } else if (!inputValue && e.key == "Enter") {
    Swal.fire({
      icon: "info",
      title: "City Name!?",
      text: "please enter the city name",
    });
  }
});
