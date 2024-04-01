const weatherAPI = "535e03dc848a467dacb175640242803";
const userCity = document.getElementById('cityInput');
const city = document.getElementById('city');
const region = document.getElementById('region');
const country = document.getElementById('country');
const weatherIcon = document.getElementById('weatherIcon');
const currentTemp = document.querySelector('.currentTemp');
const feelsLike = document.querySelector('.feelsLike');


async function getWeather(){
    const weatherFetch = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherAPI}&q=${userCity.value}&days=3`, {
        mode: 'cors'
    }) // grabs 3 days worth of weather
    
    weatherFetch.json()
    .then(data => {
        console.log(data)
        city.textContent = data.location.name;
        region.textContent = data.location.region;
        country.textContent = data.location.country;
        // weatherIcon.src = data.current.condition.icon; // icon not pulling from weatherapi
        currentTemp.textContent = `Current temperature: ${data.current.temp_c} C`;
        feelsLike.textContent = `Feels like: ${data.current.feelslike_c} C`;

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
}




function tempCheck() {
    console.log('temp changed');
}