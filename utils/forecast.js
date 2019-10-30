const request = require('request')

const forecast = (lat, long, callback) => {
    const key = 'f9c4dc06886535b914ac7f3f795e4ddc'
    const query = '?exclude=[minutely,hourly,alerts,flags]'
    const url = `https://api.darksky.net/forecast/${key}/${lat},${long}${query}`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        }
        else if (body.error) {
            callback(`Unable to retrieve the weather: ${body.error}`, undefined)
        }
        else {
            const { temperature, precipProbability } = body.currently
            const { summary: dailySummary, temperatureHigh, temperatureLow } = body.daily.data[0]
            callback(undefined, {
                temperature,
                precipProbability,
                dailySummary,
                temperatureHigh,
                temperatureLow,
                overview: `${dailySummary} It's currently ${temperature.toFixed(0)}\xB0 out with a high of ${temperatureHigh.toFixed(0)}\xB0 and a low of ${temperatureLow.toFixed(0)}\xB0. There is a ${precipProbability * 100}% chance of rain.`
            })
        }
    })
}

module.exports = forecast
