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

const API_LINK = 'http://api.openweathermap.org/geo/1.0/direct?q='
const API_KEY = '&appid=4ab8cf2758f9025894f72416b8880a36'
const API_UNITS = '&units=metric'

const getGeoCode = () => {
	const city = input.value || 'Tokyo'
	const URL = API_LINK + city + API_KEY
	axios
		.get(URL)
		.then(res => {
			getWeather(res.data[0].lat, res.data[0].lon)
			// console.log(res);
			// console.log(res.data[0].lat, res.data[0].lon);
			cityName.textContent = res.data[0].name
		})
		.catch(err => {
			console.error(err)
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
			// console.log(res);

			temperature.textContent = temp.toFixed(1) + '°C'
			humidity.textContent = hum + '%'
			weather.textContent = status.main
		})
		.catch(err => {
			console.error(err)
		})
}

const keyCheck = (e) => {
	if (e.key === 'Enter') {
		getGeoCode()
	} else if (e.key === 'Escape') {
		clearInput()	
	}
}

const clearInput = () => {
	input.value = ''
}

button.addEventListener('click', getGeoCode)
input.addEventListener('keyup', keyCheck)
input.addEventListener('click', clearInput)