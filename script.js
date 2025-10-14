const apiKey = "2c7ae00707f8cdf69d03adbe55034c64";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector("#cityInput");
const datalist = document.querySelector("#cityList");
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")



searchBox.addEventListener("input", async () => {
    const query = searchBox.value.trim();
    if (query.length < 3) return; 

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`;

    try {
        const response = await fetch(geoUrl);
        const data = await response.json();

        datalist.innerHTML = "";

        if (data.results) {
            data.results.forEach(city => {
                const option = document.createElement("option");
                option.value = `${city.name}`;
                datalist.appendChild(option);
            });
        }
    } catch (err) {
        console.error("Erreur de recherche de ville:", err);
    }
});





async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }else{
        document.querySelector(".error").style.display = "none"
        document.querySelector(".weather").style.display = "block"
    }
    var data = await response.json()
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°c`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed} Km/h`;

    if(data.weather[0].main == "Clouds"){

        weatherIcon.src = "images/clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png"
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
    }
    else if(data.weather[0].main == "Drizzlz"){
        weatherIcon.src = "images/drizzle.png"
        
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png"
        
    }
    else if(data.weather[0].main == "Snow"){
        weatherIcon.src = "images/snow.png"
        
    }
    document.querySelector(".weather").style.display = "block"
}


searchBtn.addEventListener('click',()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener("change", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value);
    }
});


