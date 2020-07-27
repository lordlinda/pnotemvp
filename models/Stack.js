const mongoose =require('mongoose')
//create stack schema
const stackSchema = mongoose.Schema({

	name:{
		type:String,
		required:true
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	notebooks:[{
	type:mongoose.Schema.Types.ObjectId,
	ref:'Notebook'
	}]
})

//create model from schema and export model
module.exports = mongoose.model('Stack',stackSchema)