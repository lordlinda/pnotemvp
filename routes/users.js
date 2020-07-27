const express =require('express')
const router=express.Router()
const passport = require('passport')


const UserControllers = require('../controllers/users.js')
const validator = require('../config/helpers.js')

//passsport config
const passportConf = require('../config/passport.js')

//@route                  /users/signup
//@description             signing up new user
//@access                  /public
router.post('/signup',validator,UserControllers.signUp)

//@route                  /users/signin
//@description             sign in up already user
//@access                  public
router.post('/signin',passport.authenticate('local',{session:false}),UserControllers.signIn)

//@route                  /users/oauth/google
//@description             sign in up already user
//@access                  public
router.post('/oauth/google',passport.authenticate('google-token',{session:false}),UserControllers.authGoogle)

module.exports =router