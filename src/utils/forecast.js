const request = require('request')

const forecast = (latitude,longitude,callback) =>{
	const url = 'http://api.weatherstack.com/current?access_key=e804b1b2138e57f860c0ba646baf2e86&query='+latitude+','+longitude+'&units=f'
	request({url, json:true},(error,{body}) =>{
		if(error){
			callback("Not able to receive response from weather API")
		}else if(body.error){
			callback('Unable to find weather for location')
		}else{
			const currentWeather = body.current
			callback(undefined,currentWeather.weather_descriptions[0]+".It is currently "+currentWeather.temperature+" degrees out.It feels like "+currentWeather.feelslike+" degrees out. Humidity outside is "+currentWeather.humidity)
		}
	})
}

module.exports = forecast