const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b03c561d31013e81b57f7b71f29ad212&query=' + encodeURIComponent(address)

    request({url, json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.error){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            callback(undefined, 'It is currently ' + response.body.current.temperature + 'C out. There is a ' + response.body.current.precip + ' percent chance of rain. The skies are ' + response.body.current.weather_descriptions[0] + '.')
        }
    }) 
}

module.exports = forecast