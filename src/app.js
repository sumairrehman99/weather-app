const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { request } = require('http')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

// Initialize express
const app = express()   

// Define paths for express configuration.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sumair Rehman Paracha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sumair Rehman Paracha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Welcome to the help page.',
        title: 'Help',
        name: 'Sumair Rehman Paracha'
    })
})


app.get('/help/*', (req, res) => {
    res.render('errors', {
        errorMessage:'Help article not found.',
        name: 'Sumair Rehman Paracha'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error){
            return res.send({error})
        }

        forecast(req.query.address, (error, response) => {
            if (error){
                return res.send({
                    error: 'Unable to connect to location services.'
                })
            }

            res.send({
                forecast: response,
                location: data.location,
                address: req.query.address
            })

        })

        

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }


    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('errors', {
        errorMessage: '404: Page Not Found',
        name: 'Sumair Rehman Paracha'
    })
})


// Configure what the server should do at a URL.




app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})