let apikey = "81835c0949a64ba425cc761acc4a8099"
let cityArea = document.getElementById('city-area')
let searchForm = document.querySelector('form')
let searchIcon = searchForm.querySelector('label[for="search"]')
let tempArea = document.getElementById('temp-area')
let humidityArea = document.getElementById('humidity-area')
let sunriseArea = document.getElementById('sunrise-area')
let sunsetArea = document.getElementById('sunset-area')
let windspeedArea = document.getElementById('windspeed-area')
let conditionDescArea = document.getElementById('condition-desc-area')
let windDegIcon = document.querySelector('.wi-wind')
let conditionIcon = document.getElementById('condition-icon')
let tempUnit = document.getElementById('temp-unit')


async function getCurrentWeather(cityname, units) {
    try {
        let currenturl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=${units}&appid=${apikey}`

        let response = await fetch(currenturl, { mode: 'cors' });
        let weatherData = await response.json();

        if (!response.ok) { 
          alert("City not found!")
          throw new Error(response.statusText) 
        }
        
        if (response.ok) {
          //Render City Name 
          renderElement(cityArea, capitalize(cityname))

          // Condition Desc
          let conditionDesc = weatherData.weather[0].description
          renderElement(conditionDescArea, capitalize(conditionDesc))

          // Condition Icon
          let conditionId = weatherData.weather[0].id
          let sunriseRaw = weatherData.sys.sunrise
          let sunsetRaw = weatherData.sys.sunset
          let currentDataTime = weatherData.dt
          renderConditions(currentDataTime, sunriseRaw, sunsetRaw, conditionId)

          // Temp
          let temp = Math.round(weatherData.main.temp)
          renderElement(tempArea, temp)

          // Humidity 
          let humidity = weatherData.main.humidity
          renderElement(humidityArea, humidity + "%")

          // Wind Speed 
          let windSpeed = Math.round(weatherData.wind.speed)
          if (units === 'metric') {
              renderElement(windspeedArea, windSpeed + 'm/s')
              tempUnit.classList = 'wi wi-celsius'
          } else {
              renderElement(windspeedArea, windSpeed + 'mph')
              tempUnit.classList = 'wi wi-fahrenheit'
          }

          // Wind Deg
          let windDeg = weatherData.wind.deg
          windDegIcon.classList.add(`towards-${windDeg}-deg`)

          // Sunrise Sunset 
          let timezone = weatherData.timezone
          let sunrise = convertToLocationTime(weatherData.sys.sunrise, timezone)
          renderElement(sunriseArea, sunrise)
          let sunset = convertToLocationTime(weatherData.sys.sunset, timezone)
          renderElement(sunsetArea, sunset)

          console.log({ weatherData })
      }
    } catch (err) {
        console.log(err)
    }

}

// City Search Form Submission 


searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchInput = document.getElementById('search')

    let inputValue = searchInput.value.trim()

    getCurrentWeather(inputValue, 'imperial')
    searchInput.value = ''
})


// Switch Units 

tempUnit.addEventListener('click', switchUnit)

function switchUnit() {
    if (tempUnit.classList.contains('wi-fahrenheit')) {
        getCurrentWeather(cityArea.innerText, 'metric')
    } else {
        getCurrentWeather(cityArea.innerText, 'imperial')
    }
}

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function convertToLocationTime(time, timezone) {
    let d = new Date(time)
    let t = time * 1000 + timezone * 1000
    let timezoneOffset = d.getTimezoneOffset() * 60000
    let locationtime = new Date(t + timezoneOffset)
    return locationtime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })
}

function renderElement(element, value) {
    element.innerText = value
}

function renderConditions(time, sunrise, sunset, id) {
    let t = ""
    if (time < sunset && time > sunrise) {
        t = 'day'
    } else {
        t = 'night'
    }
    conditionIcon.classList = `wi wi-owm-${t}-${id}`
}


getCurrentWeather('Manhattan', 'imperial')