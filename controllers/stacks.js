//stack model
const Stack = require('../models/Stack.js')

module.exports ={
	 //@route                   /stacks
    //@description            get all stacks
     //@access                  Public
     allStacks:(req,res)=>{
     	//console.log(req.user)
     	//so in this case we want to return only stacks
     	//made by the user currently signed in
     	Stack.find({user:req.user.id})
     	.then(stacks=>{
     		res.status(200).json({stacks:stacks})
     	}).catch(err=>{
     		res.status(500).json({error:err.message})
     	})
     },
	//@route                   /stacks
    //@description            creating new stack
     //@access                  Public
	createStack:(req,res)=>{
		//we get the name of the stack using req.body
		const {name}=req.body
		//when we create a stack we need to know who
		//created it
		//we can access the user using req.user
		//all we need is the id and we can get more info by
		//using .populate method
		const user =req.user.id
		const newStack =new Stack({
			name,
			user

		})
    newStack.save()
    .then(stack=>{
    	res.status(200).json({stack:stack})
    }).catch(err=>{
		res.status(500).json({error:err.message})
	})
	},
		//@route                   /stacks/:id
    //@description            updating a stack
     //@access                  Public
	updateStack:(req,res)=>{
		//when updating a stack we need to get all the parameters
		//const {name} = req.body
		//since when we are updating a stack all fields must be
		//filled we have to ensure that the user is clarified
		//too or it will become null
		//we have access to the user because we receive  the user
		//because of the passport-jwt middleware
		const user =req.user.id
          //we add the user by destructuring the object received from req.body to add a new value
          //to the user property
          //make sure to destructure before adding the user property
         Stack.update({_id:req.params.id},{...req.body,user:user})
		.then(stack=>{
			res.status(200).json({
				msg:'Stack updated'
			})
		}).catch(err=>{
			res.status(500).json({error:err.message})
		})
	},
	//@route                   /stacks/:id
//@description            get a single stack
//@access                  Public
	getStack:(req,res)=>{
		Stack.findById({_id:req.params.id})
		.populate('notebooks')
		.then(stack=>{
			//console.log(stack)
			res.status(200).json({stack:stack})
		}).catch(err=>{
			res.status(500).json({error:err.message})
		})
	},
	//@route                   /stack/:id
//@description            deleting a stack
//@access                  Public
	deleteStack:(req,res)=>{
		Stack.remove({_id:req.params.id})
		.then(stack=>{
			res.status(200).json({
				msg:"Stack deleted"
			})
		}).catch(err=>{
		    res.status(500).json({error:err.message})

			})
	},


}