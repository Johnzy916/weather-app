const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('.message--one')
const messageTwo = document.querySelector('.message--two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${encodeURIComponent(location)}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }

            messageOne.textContent = data.location
            messageTwo.textContent = data.overview
        })
    })
})
