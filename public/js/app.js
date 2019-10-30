const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.message--one')
const currentDaily = document.querySelector('.current-daily')
const highLow = document.querySelector('.high-low')
const rainChance = document.querySelector('.rain-chance')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    currentDaily.textContent = ''
    highLow.textContent = ''
    rainChance.textContent = ''

    fetch(`/weather?address=${encodeURIComponent(location)}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }

            messageOne.textContent = data.location
            currentDaily.textContent = data.dailySummary
            highLow.textContent = `It's currently ${data.temperature.toFixed(0)}\xB0 out with a high of ${data.temperatureHigh.toFixed(0)}\xB0 and a low of ${data.temperatureLow.toFixed(0)}\xB0.`
            rainChance.textContent = `There is a ${data.precipProbability * 100}% chance of rain.`
        })
    })
})
