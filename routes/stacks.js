const express = require('express')
const passport = require('passport')

const router = express.Router()

//passsport config
const passportConf = require('../config/passport.js')

const StackControllers = require('../controllers/stacks.js')
//session:false is important to mention beacuse we are using tokens and not
//sesions so no need to intialise and the rest of the configuration when using sessions
 //@route                   /stacks
    //@description            get all stacks
     //@access                  Public
router.get('/',passport.authenticate('jwt',{session:false}),StackControllers.allStacks)

//@route                   /stacks
    //@description            creating new stack
     //@access                  Public
router.post('/',passport.authenticate('jwt',{session:false}),StackControllers.createStack)

//@route                   /stacks/:id
    //@description            updating a stack
     //@access                  Public
router.patch('/:id',passport.authenticate('jwt',{session:false}),StackControllers.updateStack)
	//@route                   /stacks/:id
//@description            get a single stack
//@access                  Public

router.get('/:id',passport.authenticate('jwt',{session:false}),StackControllers.getStack)

	//@route                   /stacks/:id
//@description            deleting a stack
//@access                  Public
router.delete('/:id',passport.authenticate('jwt',{session:false}),StackControllers.deleteStack)




module.exports =router