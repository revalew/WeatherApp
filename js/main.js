// Strict mode aplies some restrictions so we could not make stupid things (which are obviously allowed in JS by default), e.g., creating variables without specifying their type, i.e., const / let
'use strict'
// -------------------------------------

const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/geo/1.0/direct?q='
const API_KEY = '&appid=4ab8cf2758f9025894f72416b8880a36'
const API_UNITS = '&units=metric'

const getGeoCode = () => {
	const city = input.value || 'Tokyo'
	const URL = API_LINK + city + API_KEY
	axios
		.get(URL)
		.then(res => {
			// I decided to assign the city name here (getGeoCode()) because, for example, Tokyo works fine here BUT, when passed through the 2nd API (getWeather()), it returns the city name as "Japan". Like seriously, why!?
			cityName.textContent = res.data[0].name
			getWeather(res.data[0].lat, res.data[0].lon)
			clearInput()
		})
		.catch(err => {
			console.error(err)
			warning.textContent = 'Wpisz poprawną nazwę miasta!'
		})
}

const getWeather = (lat, lon) => {
	const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}` + API_KEY + API_UNITS
	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			const status = Object.assign({}, ...res.data.weather)
			const id = status.id.toString()
			
			// Checking the code using RegExp
			conditions(id)

			temperature.textContent = temp.toFixed(1) + '°C'
			humidity.textContent = hum + '%'
			weather.textContent = status.main
		})
		.catch(err => {
			console.error(err)
			warning.textContent = 'Wpisz poprawną nazwę miasta!'
		})
	}
	
	const keyCheck = e => {
		if (e.key === 'Enter') {
			getGeoCode()
		} else if (e.key === 'Escape') {
			clearInput()
		}
	}
	
	const clearInput = () => {
		input.value = ''
		warning.textContent = ''
	}
	
	const conditions = e => {
	// RegExp attempt
	// e = '800' // testing value
	const thunderstorm = /^2[0-9]{2}/
	const drizzle = /^3[0-9]{2}/
	const rain = /^5[0-9]{2}/
	const snow = /^6[0-9]{2}/
	const atmosphere = /^7[0-9]{2}/
	const clear = /^800/
	const clouds = /^80[0-9]?/

	if (e.match(thunderstorm)) {
		photo.setAttribute('src', './img/thunderstorm.png')
	} else if (e.match(drizzle)) {
		photo.setAttribute('src', './img/drizzle.png')
	} else if (e.match(rain)) {
		photo.setAttribute('src', './img/rain.png')
	} else if (e.match(snow)) {
		photo.setAttribute('src', './img/ice.png')
	} else if (e.match(atmosphere)) {
		photo.setAttribute('src', './img/fog.png')
	} else if (e.match(clear)) {
		photo.setAttribute('src', './img/sun.png')
	} else if (e.match(clouds)) {
		photo.setAttribute('src', './img/cloud.png')
	} else {
		photo.setAttribute('src', './img/unknown.png')
	}
}

button.addEventListener('click', getGeoCode)
input.addEventListener('keyup', keyCheck)
input.addEventListener('click', clearInput)
window.addEventListener('DOMContentLoaded', getGeoCode)
