const request = require('request')

const geocode = (address, callback) =>{
	const geoUrl = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=1&access_token=pk.eyJ1Ijoic21uaXNoYW50aCIsImEiOiJja29iamRwNnMwMjM4Mm9tanhzeHNnbXloIn0.puZ_90Q0l4AA7C2s4qz-ow'
	
	request({url:geoUrl, json:true},(error,{body:response}) =>{
	if(error){
		callback("Not able to receive response from Geo code API")
	}else if(response.features.length == 0){
		callback('Provide a valid input . Unable to find Geo location')
	}else{
		callback(undefined,{
			latitude : response.features[0].center[1],
			longitude : response.features[0].center[0],
			location : response.features[0].place_name
		})
	}
})
}

module.exports = geocode