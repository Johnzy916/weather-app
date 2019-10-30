const request = require('request')

const geocode = (address, callback) => {
    const key = 'pk.eyJ1Ijoiam9obnp5OTE2IiwiYSI6ImNrMXdhcnNjMjBsc3AzZHM3bHl3NTI3M3kifQ.EtOEPu_a2XV4AqznIf6P_g'
    const query = '&limit=1'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${key}${query}`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        }
        else if (body.message) {
            callback(`Unable to connect to location services: ${body.message}`, undefined)
        }
        else if (body.features.length === 0) {
            callback(`Unable to find location. Please try another search term.`, undefined)
        }
        else {
            const { place_name: location } = body.features[0]
            const [long, lat] = body.features[0].center
            callback(undefined, {
                location,
                lat,
                long
            })
        }
    })
}

module.exports = geocode
