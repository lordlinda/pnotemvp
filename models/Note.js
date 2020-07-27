const mongoose =require('mongoose')
//create Note schema
const noteSchema = mongoose.Schema({
	title:{
		type:String
	},
	body:{
		type:String,
		required:true
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	}
})

//create model from schema and export model
module.exports = mongoose.model('Note',noteSchema)