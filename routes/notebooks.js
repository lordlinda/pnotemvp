const express = require('express')
const passport = require('passport')

const router = express.Router()

//passsport config for passport-jwt
const passportConf = require('../config/passport.js')

//session:false is important to mention beacuse we are using tokens and not
//sesions so no need to intialise and the rest of the configuration when using sessions
const NotebookControllers = require('../controllers/notebooks.js')
 //@route                   /notebooks
 //@description            get all notebooks
 //@access                  Private
  router.get('/',passport.authenticate('jwt',{session:false}),NotebookControllers.allNotebooks)

//@route                   /notebooks
//@description            creating new notebook
//@access                  Private
router.post('/',passport.authenticate('jwt',{session:false}),NotebookControllers.createNotebook)

//@route                   /notebooks/:id
//@description            updating notebook title
//@access                  Private
router.patch('/:id',passport.authenticate('jwt',{session:false}),NotebookControllers.updateNotebook)

//@route                   /notebooks/:id
//@description            get a single notebook
//@access                  Private
router.get('/:id',passport.authenticate('jwt',{session:false}),NotebookControllers.getNotebook)

//@route                   /notebooks/:id
//@description            deleting a notebook
//@access                  Private
router.delete('/:id',passport.authenticate('jwt',{session:false}),NotebookControllers.deleteNotebook)

//@route                   /notebooks/notebook/:id
   //@description            add a notebook to stack
   //@access                  Public
router.patch('/notebook/:id',passport.authenticate('jwt',{session:false}),NotebookControllers.notebookToStack)
//@route                   /notebooks/note/notebook/:id
//@description            creating new note in notebook
//@access                  Private
router.patch('/note/notebook/:id',passport.authenticate('jwt',{session:false}),NotebookControllers.createNoteInNotebook)


module.exports =router