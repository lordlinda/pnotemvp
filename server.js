const  express=require('express')
const  morgan = require('morgan')
const bodyParser = require('body-parser')
const cors =require('cors')
const mongoose = require('mongoose')
const path=require('path')
const dotenv = require('dotenv')

dotenv.config()

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pnote",{
useNewUrlParser: true ,
useUnifiedTopology: true
})
.then(()=>console.log('connected to mongodb'))
.catch(err=>console.log('just a little issue with mongodb'))


//Init app
const app =express();
//middlewares
//this limits the cors errors while connecting to the front end
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//this allows us to read the .env file
//we are running this middleware because  in
//production we want some middleware to run
//e.g in production we want to serve our frontend from the build file
////which is not the case for development
//and in development some other midleware to run
//in development we want morgan to run
//we only want it to go to production during development or it wont work locally
if(process.env.NODE_ENV === "development"){
	//console.log('morgan')
	app.use(morgan('dev'))

}

if(process.env.NODE_ENV === "production"){
	//console.log('morgan')
	//app.use(morgan('dev'))
//serve static files
  app.use(express.static(path.join(__dirname, "frontend", "build")))

}



//Routes
app.use('/notes',require('./routes/notes.js'))
app.use('/notebooks',require('./routes/notebooks.js'))
app.use('/stacks',require('./routes/stacks.js'))
app.use('/users',require('./routes/users.js'))
//handle errors
//structured way of handling all other errors
//that are not catered for in the routes
app.use((err,req,res,next)=>{
	res.status(500).json({error:err.message})
	next();
})

//these need to be at the bottom
if(process.env.NODE_ENV === "production"){

//you need this for the routes to work
//Right before app.listen()
//it is a catch call route handler,it is  in charge of sending the  main index.html file
//back to the client if it didnt receive a request it recognised otherwise
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

}

//port
const Port =process.env.PORT || 5000
//listen for server
app.listen(Port,()=>console.log(`server is listening on port ${Port}`))