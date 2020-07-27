const  express=require('express')
const  morgan = require('morgan')
const bodyParser = require('body-parser')
const cors =require('cors')
const mongoose = require('mongoose')
const path=require('path')

//connect to mongodb
mongoose.connect('mongodb+srv://lord:phaneroo@5@cluster0.nuqxe.mongodb.net/pnote?retryWrites=true&w=majority',{
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
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//serve static files
app.use(express.static('frontend/build'))
//you need this for the routes to work
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

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
//port
const Port =process.env.PORT || 5000
//listen for server
app.listen(Port,()=>console.log(`server is listening on port ${Port}`))