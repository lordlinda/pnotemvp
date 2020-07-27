const mongoose =require('mongoose')
//create Notebook schema
const notebookSchema = mongoose.Schema({
	
	title:{
		type:String,
		required:true
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	notes:[{
	type:mongoose.Schema.Types.ObjectId,
	ref:'Note'
	}]
})

//create model from schema and export model
module.exports = mongoose.model('Notebook',notebookSchema)