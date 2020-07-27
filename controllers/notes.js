//Note model
const Note = require('../models/Note.js')
//Notebook model
const Notebook = require('../models/Notebook.js')


module.exports ={
     //@route                   /notes
    //@description            get all notes
     //@access                  Public
     allNotes:(req,res)=>{
     	//console.log(req.user)
     	Note.find({user:req.user.id})
     	.then(notes=>{
     		res.status(200).json({notes:notes})
     	}).catch(err=>{
     		res.status(500).json({error:err.message})
     	})
     },
	//@route                   /notes
    //@description            creating new note
     //@access                  Public
	createNote:(req,res)=>{
		//we get the title and body using req.body
		const {title,body}=req.body
		//when we create a note we need to know who
		//created it
		//we can access the user using req.user
		//all we need is the id and we can get more info by
		//using .populate method
		const user =req.user.id
		//console.log('notes',user._id)
		const newNote =new Note({
			title,
			body,
			user

		})
    newNote.save()
    .then(note=>{
    	res.status(200).json({note:note})
    }).catch(err=>{
		res.status(500).json({error:err.message})
	})
	},
	//@route                   /notes/:id
//@description            updating note
//@access                  Public
	updateNote:(req,res)=>{
		//when updating a note we need to get all the parameters
		//const {title,body} = req.body
		//since when we are updating a note all fields must be
		//filled we have to ensure that the user is clarified
		//too or it will become null
		//we have access to the user because we receive  the user
		//becauseof the passport-jwt middleware
		const user =req.user.id
          //we add the user by destructuring the object to add a new value
          //to the user property
          //make sure to destructure before adding the user property
         Note.update({_id:req.params.id},{...req.body,user:user})
		.then(note=>{
			res.status(200).json({
				msg:'Note updated'
			})
		}).catch(err=>{
			res.status(500).json({error:err.message})
		})
	},
	//@route                   /notes/:id
//@description            get a single note
//@access                  Public
	getNote:(req,res)=>{
		Note.findById({_id:req.params.id})
		.then(note=>{
			res.status(200).json({note:note})
		}).catch(err=>{
			res.status(500).json({error:err.message})
		})
	},
	//@route                   /notes/:id
//@description            deleting a note
//@access                  Public
	deleteNote:(req,res)=>{
		Note.remove({_id:req.params.id})
		.then(note=>{
			res.status(200).json({
				msg:"note deleted"
			})
		}).catch(err=>{
		    res.status(500).json({error:err.message})

			})
	},
//@route                   /notes/note/:id
//@description            add a note to notebook
//@access                  Public
	noteToNotebook:(req,res)=>{
		//console.log('added to notebook')
		//1.we get the id of the note
		Note.findById({_id:req.params.id})
		//2.we get the id of the notebook to know which notebook
		//to add the note
		.then(note=>{
			//console.log(note)
			//3.We have to first check if the note is not already in the notes array in the notebook
			//			//in this case you use findOne and not just find

			Notebook.findOne({notes:note._id}).
			then(notebook=>{
				//console.log(notebook)
				if(notebook){
					return res.status(422).json({msg:'note already in notebook'})
				}
				//4.push the note to the notes array in the notebook
             //console.log('req.body',req.body)
			Notebook.update({_id:req.body.notebook}, {$push:{notes:{
				//this ensures that the note is added to the top of the array
				$each:[note._id],
				$position:0
			}}})
			.then(notebook=>{
				res.status(200).json({msg:'note added',notebook:notebook})
				//we return a message to the client that
				//the note was not added to the notebook
			}).catch(err=>{
			res.status(500).json({
					error:err.message,
					msg:'note not added'
				})
			})

			}).catch(err=>{
			 res.status(500).json({
			 	error:err.message,
			 	//msg:'note already in notebook'
			 })
			})
      //we return an error if the note was not found
      //with a message
		}).catch(err=>{
			res.status(400).json({
				error:err.message,
				msg:'note not found'
			})
		})
	}


}