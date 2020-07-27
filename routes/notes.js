const express = require('express')
const passport = require('passport')

const router = express.Router()


//passsport config
const passportConf = require('../config/passport.js')

const NoteControllers = require('../controllers/notes.js')
//session false is important  inorder for passport to know
//we are not using session but jsonwebtoken

  //@route                   /notes
 //@description            get all notes
 //@access                  Private
  router.get('/',passport.authenticate('jwt',{session:false}),NoteControllers.allNotes)
//@route                   /notes
//@description            creating new note
//@access                  Pivate
router.post('/',passport.authenticate('jwt',{session:false}),NoteControllers.createNote)

//@route                   /notes/:id
//@description            updating note
//@access                  Pivate
router.patch('/:id',passport.authenticate('jwt',{session:false}),NoteControllers.updateNote)

//@route                   /notes/:id
//@description            get a single note
//@access                  Pivate
router.get('/:id',passport.authenticate('jwt',{session:false}),NoteControllers.getNote)

//@route                   /notes/:id
//@description            deleting a note
//@access                  P
router.delete('/:id',passport.authenticate('jwt',{session:false}),NoteControllers.deleteNote)

//@route                   /notes/note/:id
//@description            add a note to notebook
//@access                  Private
router.patch('/note/:id',passport.authenticate('jwt',{session:false}),NoteControllers.noteToNotebook)

module.exports =router