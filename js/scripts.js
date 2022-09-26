const apiKey = "8b65c642379f9c1bae0f0cdb715862d2";

const apiCountryURL = "https://countryflagsapi.com/png/"

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")


const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const erro = document.getElementById("teste")
const weatherContainer = document.querySelector("#weather-data")

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`


    const res = await fetch(apiWeatherURL)
    const data = await res.json()



    return data;


}


const showWeatherData = async (city) => {


    const data = await getWeatherData(city);

    if (data.name === undefined) {
        cityElement.innerText = `Cidade não encontrada`
        tempElement.innerText = 'erro'
        descElement.innerText = 'erro'
        weatherIconElement.innerText = 'erro'
        countryElement.innerText = 'erro'
        humidityElement.innerText = 'erro'
        windElement.innerText = 'erro'
        weatherContainer= ''
    } else {
        cityElement.innerText = `${data.name}, ` + ` ${data.sys.country}`;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute("src", apiCountryURL + data.sys.country);
        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}km/h`
        weatherContainer.classList.remove("hide")


        weatherContainer.classList = '';

    }

};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();



    const city = cityInput.value;
    showWeatherData(city);



})


cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);


    }
})
