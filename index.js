let apikey = "81835c0949a64ba425cc761acc4a8099"

let cityname = "Portland"

// let days = 1

let currenturl = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}`

let unitsF = `&units=imperial`
let unitsC = `&units=metric`

// let dailyurl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityname}&cnt=${days}&appid=${apikey}`

async function getCurrentWeather() {
    let response = await fetch(currenturl, { mode: 'cors' });
    let weatherData = await response.json();
    console.log(weatherData)

    // Temp 
    let TempK = weatherData.main.temp
    let TempC = convertKToC(TempK)
    let TempF = convertKToF(TempK)
    console.log({ TempC, TempK, TempF })

    // Feels Like 
    let feelsLikeTempK = weatherData.main.feels_like
    let feelsLikeTempC = convertKToC(feelsLikeTempK)
    let feelsLikeTempF = convertKToF(feelsLikeTempK)
    console.log({ feelsLikeTempK, feelsLikeTempC, feelsLikeTempF })

    // Humidity 
    let humidity = weatherData.main.humidity
    console.log({ humidity })

    // Wind 
    let windSpeed = weatherData.wind.speed
    let windDeg = weatherData.wind.deg

    // Conditions
    let conditionId = weatherData.weather.id
    let conditionDesc = weatherData.weather.description

    // Sunrise Sunset 
    let sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })
    let sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' })
    console.log({ sunrise, sunset })

    // Clouds 
    let clouds = weatherData.clouds.all
}




getCurrentWeather()

function convertKToC(temp) {
    return Math.round(Number(temp) - 273.15)
}

function convertKToF(temp) {
    return Math.round((Number(temp) - 273.15) * (9 / 5) + 32)
}