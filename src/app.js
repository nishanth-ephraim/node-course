const express = require ('express')
const path =require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=> {
	res.render('index',{
		title : 'Weather',
		name : 'Rach'
	})
})

app.get('/about',(req,res) =>{
	res.render('about',{
		title : 'About Page',
		name : 'Rach'
	})
})

app.get('/help',(req,res) =>{
	res.render('help',{
		title : 'Help Page',
		name : 'Rach',
		helpText : 'Navigate to user page to find user details . This is the profile page'
	})
})

app.get('/weather',(req,res)=>{
	if(!req.query.address){
		return res.send({
			error : 'You must provide an address'
		})
	}
	
	geocode(req.query.address, (error, {latitude,longitude,location} = {}) =>{
		if(error){
			return res.send({error})
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if(error){
				return res.send({error})
			}

			res.send({
				address : req.query.address,
				location,
				forecast : forecastData
			})
		})
	})
})

app.get('/products',(req,res) =>{
	if(!req.query.search){
		return res.send({
			error : 'Please provide search term'
		})
	}
	res.send({
		products : []
	})
})


app.get('/help/*',(req,res) =>{
	res.render('error',{
		title : 'Error Page',
		name : 'Rach',
		error : 'Help Article not found'
	})
})

app.get('*',(req,res) =>{
	res.render('error',{
		title : 'Error Page',
		name : 'Rach',
		error : 'Page not found'
	})
})

app.listen(port,()=>{
	console.log('Server is up on port '+port)
})