//Notebook model
const Notebook = require('../models/Notebook.js')
//Stack model
const Stack = require('../models/Stack.js')
//Note model
const Note = require('../models/Note.js')
module.exports ={
	 //@route                   /notes
    //@description            get all notebooks
     //@access                  Public
     allNotebooks:(req,res)=>{
     	//console.log(req.user)
     	//so in this case we want to return only notebooks 
     	//made by the user currently signed in
     	Notebook.find({user:req.user.id})
     	.then(notebooks=>{
     		res.status(200).json({notebooks:notebooks})
     	}).catch(err=>{
     		res.status(500).json({error:err.message})
     	})
     },
	//@route                   /notes
    //@description            creating new notebook
     //@access                  Public
	createNotebook:(req,res)=>{
		//we get the title using req.body
		const {title}=req.body
		//when we create a notebook we need to know who
		//created it
		//we can access the user using req.user
		//all we need is the id and we can get more info by
		//using .populate method
		const user =req.user.id
		const newNotebook =new Notebook({
			title,
			user

		})
    newNotebook.save()
    .then(notebook=>{
    	res.status(200).json({notebook:notebook})
    }).catch(err=>{
		res.status(500).json({error:err.message})
	})
	},
	//@route                   /notebooks/:id
    //@description            updating a notebook
     //@access                  Public
	updateNotebook:(req,res)=>{
		//when updating a notebook we need to get all the parameters
		//const {title} = req.body
		//since when we are updating a notebook all fields must be
		//filled we have to ensure that the user is clarified
		//too or it will become null
		//we have access to the user because we receive  the user
		//because of the passport-jwt middleware
		const user =req.user.id
          //we add the user by destructuring the object received from req.body to add a new value
          //to the user property
          //make sure to destructure before adding the user property
         Notebook.update({_id:req.params.id},{...req.body,user:user})
		.then(notebook=>{
			res.status(200).json({
				msg:'Notebook updated'
			})
		}).catch(err=>{
			res.status(500).json({error:err.message})
		})
	},
	//@route                   /notebooks/:id
//@description            get a single notebook
//@access                  Public
	getNotebook:(req,res)=>{
		Notebook.findById({_id:req.params.id})
		.populate('notes')
		.then(notebook=>{
			res.status(200).json({notebook:notebook})
		}).catch(err=>{
			res.status(500).json({error:err.message})
		})
	},
	//@route                   /notebooks/:id
//@description            deleting a notebook
//@access                  Public
	deleteNotebook:(req,res)=>{
		Notebook.remove({_id:req.params.id})
		.then(notebook=>{
			res.status(200).json({
				msg:"notebook deleted"
			})
		}).catch(err=>{
		    res.status(500).json({error:err.message})

			})
	},
	//@route                   /notebooks/notebook/:id
   //@description            add a notebook to stack
   //@access                  Public
	notebookToStack:(req,res)=>{
		//console.log('added to stack')
		//1.we get the id of the notebook
		Notebook.findById({_id:req.params.id})

		//2.we get the id of the stack to know which  stack
		//to add the notebook
		.then(notebook=>{
			//console.log(notebook)
			//3.We have to first check if the notebook is not already in the notebooks array in the stack
			//in this case you use findOne and not just find
			Stack.findOne({notebooks:notebook._id})
			.then(stack=>{
				console.log(stack)
				if(stack){
					return res.status(422).json({msg:'notebook already in stack'})
				}
				//4.push the notebook to the notebooks array in the  stack
            // console.log(req.body)
			Stack.update({_id:req.body.stack}, {$push:{notebooks:{
				//this ensures that the note is added to the top of the array
				$each:[notebook._id],
				$position:0
			}}})
			.then(stack=>{
				res.status(200).json({msg:'notebook added'})
				//we return a message to the client that
				//the note was not added to the notebook
			}).catch(err=>{
			res.status(500).json({
					error:err.message,
					msg:'notebook not added'
				})
			})

			}).catch(err=>{
			 res.status(500).json({
			 	error:err.message,

			 })
			})
      //we return an error if the notebook was not found
      //with a message
		}).catch(err=>{
			res.status(400).json({
				error:err.message,
				msg:'notebook not found'
			})
		})
	},
	//@route                   /notebooks/note/notebook/:id
    //@description            creating new note in notebook
     //@access                  Public

createNoteInNotebook:(req,res)=>{
	//1.Get the notebook
	//2.Create the note
	//3.Add the note to the notes array
	Notebook.findById({_id:req.params.id})
	.then(notebook=>{
		//console.log(req.body)
		///creating note
      Note.create(req.body)
      .then(note=>{
      	//console.log(note)
      	//the note is then added to the start of the notes array
      	//we push the note to the array
      	//but first we must get the id of the notebook we want to 
      	//push it to using the url
      	Notebook.update({_id:req.params.id},{$push:{notes:{
      		$each:[note._id],
      		$positon:0
      	}}}).then(notebook=>{
      		//console.log(notebook)
      		res.status(200).json({
      			msg:'note created in notebook'
      		})
//if it was not added successfully we send an error back to the client
      	}).catch(err=>{
      		res.status(500).json({
      			error:err.message,
      			msg:'notebook not updated'
      		})
      	})
      }).catch(err=>{
      	console.log(err)
      })

	}).catch(err=>{
		res.status(400).json({
			error:err.message,
			msg:'notebook not found'
		})
	})
}


}