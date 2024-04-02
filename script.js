const currentTemp = document.querySelector('.currentTemp');
const feelsLike = document.querySelector('.feelsLike');
let forecast;
let currentData;

async function getWeather(){
    const weatherAPI = "535e03dc848a467dacb175640242803";
    const cityInput = document.getElementById('cityInput');
    const weatherFetch = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPI}&q=${cityInput.value}&days=4`, {
        mode: 'cors'
    }) // grabs 3 days worth of weather (currently set to 4 days, as the first day it grabs is the current date, not sure if after the extended trail is over this will stop and it technically only does 2 days in advance)
    
    weatherFetch.json()
    .then(data => {
        console.log(data)
        let currentLocation = data.location;
        forecast = data.forecast.forecastday;
        currentData = data.current;
        populateMainDisplay(currentLocation);
        populateForecastCards();
        // console.log(data.location.name)
        // console.log(data.location.region)
        // console.log(data.location.country)
        // console.log(data.current.condition.icon)
        // console.log(data.current.condition.text)
        // console.log("current temp is " + data.current.temp_c + "C") // current temp in C
        // console.log("feels like " + data.current.feelslike_c + "C") // 'feels like' in C
        // console.log("current temp is " + data.current.temp_f + "F") // current temp in F
        // console.log("feels like " + data.current.feelslike_f + "F") // 'feels like' in F
    });
};

function populateMainDisplay(currentLocation){
    const city = document.getElementById('city');
    const region = document.getElementById('region');
    const country = document.getElementById('country');
    const weatherIcon = document.getElementById('weatherIcon');
    const condition = currentData.condition.text.trim();
    city.textContent = currentLocation.name;
    region.textContent = currentLocation.region;
    country.textContent = currentLocation.country;
    currentTemp.textContent = `Current temperature: ${currentData.temp_c} C`;
    feelsLike.textContent = `Feels like: ${currentData.feelslike_c} C`;
    getMainIcon(condition, weatherIcon);
};

function populateForecastCards(){
    const cardContainer = document.querySelector('.card-container');
    cardContainer.classList.remove('hidden');
    setCardIcons();
    setCardTempsC();
    setCardDates();
    setCardCondition();
    setSunrise();
    setSunset();
};

function setCardIcons(){
    let iconCounter = 1;
    const cardIcons = document.querySelectorAll('.cardIcon');
    cardIcons.forEach(icon => {
        const iconCondition = forecast[iconCounter].day.condition.text.trim();
        getForecastIcons(iconCondition, icon);
        iconCounter++;
    })
};

function setCardTempsC() {
    let maxTempCounterC = 1;
    const cardTempMax = document.querySelectorAll('.cardTempMax');
    cardTempMax.forEach(maxTemp => {
        const maxTempC = forecast[maxTempCounterC].day.maxtemp_c;
        maxTemp.textContent = `${maxTempC} \u00B0 c`; // '\u00B0' creates the degree symbol
        maxTempCounterC++;
    })

    let minTempCounterC = 1;
    const cardTempMin = document.querySelectorAll('.cardTempMin');
    cardTempMin.forEach(minTemp => {
        const minTempC = forecast[minTempCounterC].day.mintemp_c;
        minTemp.textContent = `Low: ${minTempC} \u00B0 c`;
        minTempCounterC++;
    })
};

function setCardTempsF(){
    let maxTempCounterF = 1;
    const cardTemp = document.querySelectorAll('.cardTempMax');
    cardTemp.forEach(temp => {
        const maxTempF = forecast[maxTempCounterF].day.maxtemp_f;
        temp.textContent = `${maxTempF} \u00B0 f`; // '\u00B0' creates the degree symbol
        maxTempCounterF++;
    })

    let minTempCounterF = 1;
    const cardTempMin = document.querySelectorAll('.cardTempMin');
    cardTempMin.forEach(minTemp => {
        const minTempF = forecast[minTempCounterF].day.mintemp_f;
        minTemp.textContent = `Low: ${minTempF} \u00B0 f`;
        minTempCounterF++;
    })
};

function setCardDates() {
    let dateCounter = 1;
    const cardDate = document.querySelectorAll('.cardDate');
    cardDate.forEach(date => {
        const forecastDate = forecast[dateCounter].date;
        date.textContent = forecastDate;
        dateCounter++;
    })
};

function setCardCondition(){
    let conditionCounter = 1;
    const cardCondition = document.querySelectorAll('.weatherCondition');
    cardCondition.forEach(weatherDescription => {
        const weatherCondition = forecast[conditionCounter].day.condition.text.trim();
        weatherDescription.textContent = weatherCondition;
        conditionCounter++;
    })
};

function setSunrise(){
    let sunriseCounter = 1;
    const sunriseField = document.querySelectorAll('.sunrise');
    sunriseField.forEach(field => {
        const sunriseTime = forecast[sunriseCounter].astro.sunrise;
        field.innerText =
        `Sunrise:
        ${sunriseTime}`;
        sunriseCounter++;
    })
};

function setSunset(){
    let sunsetCounter = 1;
    const sunsetField = document.querySelectorAll('.sunset');
    sunsetField.forEach(field => {
        const sunsetTime = forecast[sunsetCounter].astro.sunset;
        field.innerText =
        `Sunset:
        ${sunsetTime}`;
        sunsetCounter++;
    })
};


// possible text for "data.current.condition.text"
const weatherConditions = [
    {
        "code" : 1000,
        "day" : "Sunny",
        "night" : "Clear",
        "icon" : 113
    },
    {
        "code" : 1003,
        "day" : "Partly cloudy",
        "night" : "Partly cloudy",
        "icon" : 116
    },
    {
        "code" : 1006,
        "day" : "Cloudy",
        "night" : "Cloudy",
        "icon" : 119
    },
    {
        "code" : 1009,
        "day" : "Overcast",
        "night" : "Overcast",
        "icon" : 122
    },
    {
        "code" : 1030,
        "day" : "Mist",
        "night" : "Mist",
        "icon" : 143
    },
    {
        "code" : 1063,
        "day" : "Patchy rain nearby",
        "night" : "Patchy rain nearby",
        "icon" : 176
    },
    {
        "code" : 1066,
        "day" : "Patchy snow possible",
        "night" : "Patchy snow possible",
        "icon" : 179
    },
    {
        "code" : 1069,
        "day" : "Patchy sleet possible",
        "night" : "Patchy sleet possible",
        "icon" : 182
    },
    {
        "code" : 1072,
        "day" : "Patchy freezing drizzle possible",
        "night" : "Patchy freezing drizzle possible",
        "icon" : 185
    },
    {
        "code" : 1087,
        "day" : "Thundery outbreaks possible",
        "night" : "Thundery outbreaks possible",
        "icon" : 200
    },
    {
        "code" : 1114,
        "day" : "Blowing snow",
        "night" : "Blowing snow",
        "icon" : 227
    },
    {
        "code" : 1117,
        "day" : "Blizzard",
        "night" : "Blizzard",
        "icon" : 230
    },
    {
        "code" : 1135,
        "day" : "Fog",
        "night" : "Fog",
        "icon" : 248
    },
    {
        "code" : 1147,
        "day" : "Freezing fog",
        "night" : "Freezing fog",
        "icon" : 260
    },
    {
        "code" : 1150,
        "day" : "Patchy light drizzle",
        "night" : "Patchy light drizzle",
        "icon" : 263
    },
    {
        "code" : 1153,
        "day" : "Light drizzle",
        "night" : "Light drizzle",
        "icon" : 266
    },
    {
        "code" : 1168,
        "day" : "Freezing drizzle",
        "night" : "Freezing drizzle",
        "icon" : 281
    },
    {
        "code" : 1171,
        "day" : "Heavy freezing drizzle",
        "night" : "Heavy freezing drizzle",
        "icon" : 284
    },
    {
        "code" : 1180,
        "day" : "Patchy light rain",
        "night" : "Patchy light rain",
        "icon" : 293
    },
    {
        "code" : 1183,
        "day" : "Light rain",
        "night" : "Light rain",
        "icon" : 296
    },
    {
        "code" : 1186,
        "day" : "Moderate rain at times",
        "night" : "Moderate rain at times",
        "icon" : 299
    },
    {
        "code" : 1189,
        "day" : "Moderate rain",
        "night" : "Moderate rain",
        "icon" : 302
    },
    {
        "code" : 1192,
        "day" : "Heavy rain at times",
        "night" : "Heavy rain at times",
        "icon" : 305
    },
    {
        "code" : 1195,
        "day" : "Heavy rain",
        "night" : "Heavy rain",
        "icon" : 308
    },
    {
        "code" : 1198,
        "day" : "Light freezing rain",
        "night" : "Light freezing rain",
        "icon" : 311
    },
    {
        "code" : 1201,
        "day" : "Moderate or heavy freezing rain",
        "night" : "Moderate or heavy freezing rain",
        "icon" : 314
    },
    {
        "code" : 1204,
        "day" : "Light sleet",
        "night" : "Light sleet",
        "icon" : 317
    },
    {
        "code" : 1207,
        "day" : "Moderate or heavy sleet",
        "night" : "Moderate or heavy sleet",
        "icon" : 320
    },
    {
        "code" : 1210,
        "day" : "Patchy light snow",
        "night" : "Patchy light snow",
        "icon" : 323
    },
    {
        "code" : 1213,
        "day" : "Light snow",
        "night" : "Light snow",
        "icon" : 326
    },
    {
        "code" : 1216,
        "day" : "Patchy moderate snow",
        "night" : "Patchy moderate snow",
        "icon" : 329
    },
    {
        "code" : 1219,
        "day" : "Moderate snow",
        "night" : "Moderate snow",
        "icon" : 332
    },
    {
        "code" : 1222,
        "day" : "Patchy heavy snow",
        "night" : "Patchy heavy snow",
        "icon" : 335
    },
    {
        "code" : 1225,
        "day" : "Heavy snow",
        "night" : "Heavy snow",
        "icon" : 338
    },
    {
        "code" : 1237,
        "day" : "Ice pellets",
        "night" : "Ice pellets",
        "icon" : 350
    },
    {
        "code" : 1240,
        "day" : "Light rain shower",
        "night" : "Light rain shower",
        "icon" : 353
    },
    {
        "code" : 1243,
        "day" : "Moderate or heavy rain shower",
        "night" : "Moderate or heavy rain shower",
        "icon" : 356
    },
    {
        "code" : 1246,
        "day" : "Torrential rain shower",
        "night" : "Torrential rain shower",
        "icon" : 359
    },
    {
        "code" : 1249,
        "day" : "Light sleet showers",
        "night" : "Light sleet showers",
        "icon" : 362
    },
    {
        "code" : 1252,
        "day" : "Moderate or heavy sleet showers",
        "night" : "Moderate or heavy sleet showers",
        "icon" : 365
    },
    {
        "code" : 1255,
        "day" : "Light snow showers",
        "night" : "Light snow showers",
        "icon" : 368
    },
    {
        "code" : 1258,
        "day" : "Moderate or heavy snow showers",
        "night" : "Moderate or heavy snow showers",
        "icon" : 371
    },
    {
        "code" : 1261,
        "day" : "Light showers of ice pellets",
        "night" : "Light showers of ice pellets",
        "icon" : 374
    },
    {
        "code" : 1264,
        "day" : "Moderate or heavy showers of ice pellets",
        "night" : "Moderate or heavy showers of ice pellets",
        "icon" : 377
    },
    {
        "code" : 1273,
        "day" : "Patchy light rain with thunder",
        "night" : "Patchy light rain with thunder",
        "icon" : 386
    },
    {
        "code" : 1276,
        "day" : "Moderate or heavy rain with thunder",
        "night" : "Moderate or heavy rain with thunder",
        "icon" : 389
    },
    {
        "code" : 1279,
        "day" : "Patchy light snow with thunder",
        "night" : "Patchy light snow with thunder",
        "icon" : 392
    },
    {
        "code" : 1282,
        "day" : "Moderate or heavy snow with thunder",
        "night" : "Moderate or heavy snow with thunder",
        "icon" : 395
    }
];

function getMainIcon(condition, iconSource) {
    weatherConditions.forEach(item => {
        const icon = item.icon
        if (item.day === condition && currentData.is_day === 1){
            iconSource.src = `./images/day/${icon}.png`;
            console.log(item.icon);
            return;
        } else if (item.night === condition && currentData.is_day === 0){
            iconSource.src = `./images/night/${icon}.png`;
            console.log(item.icon);
            return;
        }
    })
};

function getForecastIcons(condition, iconSource) {
    weatherConditions.forEach(item => {
        const icon = item.icon;
        if (item.day === condition){
            iconSource.src = `./images/day/${icon}.png`;
            console.log(item.icon);
            return;
        } else {
            return;
        }
    })
};



// function tempToggleSwitchWatcher(){
//     const tempToggleSwitch = document.querySelector('.switch');
// }



let tempToggle = 0;
function tempChange() {
    if (tempToggle === 1){
        tempToggle = 0;
        currentTemp.textContent = `Current temperature: ${currentData.temp_c} C`;
        feelsLike.textContent = `Feels like: ${currentData.feelslike_c} C`;
        setCardTempsC();
        return;
    }
    tempToggle = 1;
    currentTemp.textContent = `Current temperature: ${currentData.temp_f} F`;
    feelsLike.textContent = `Feels like: ${currentData.feelslike_f} F`;
    setCardTempsF();
};