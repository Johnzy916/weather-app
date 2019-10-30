const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 8080

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Serve up static directory to serve
app.use(express.static(publicDirectoryPath))

//========================

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jhonathan Angus'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Jhonathan Angus'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: `Put in a location and search it. That's all there is to it.`,
        name: 'Jhonathan Angus'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, long, (forecastError, { temperature, precipProbability, dailySummary, temperatureHigh, temperatureLow } = {}) => {
            if (error) {
                return res.send({ error: forecastError })
            }
            res.send({
                address: req.query.address,
                location,
                temperature,
                precipProbability,
                dailySummary,
                temperatureHigh,
                temperatureLow
            })
        })
    });
})

app.get('/help/*', (req, res) => {
    res.render('oops', {
        title: '404!',
        errorMessage: 'Help article not found!',
        name: 'Jhonathan Angus'
    })
})

app.get('*', (req, res) => {
    res.render('oops', {
        title: '404!',
        message: 'Page not found!',
        name: 'Jhonathan Angus'
    })
})

//========================

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
