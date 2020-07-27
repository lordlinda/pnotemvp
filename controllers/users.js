const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/index.js')

//User model
const User = require('../models/User.js')
//the function takes in a user and returns ajwt token
signedToken =(user) =>{
  //we just return the token
  return jwt.sign({
  sub:user._id,
  //exp:Math.floor(Date.now() / 1000) + (60 * 60)
  },JWT_SECRET)
}
module.exports={
  //@route                  /users/signup
//@description             signing up new user
//@access                  /public
	signUp:(req,res)=>{
     //console.log(req.body)
    //we get the credentials from the client
     const {username,email,password}=req.body

    //we validate the credentials
    ////if credentials are invalid we send error to the client
    // Finds the validation errors in this request and wraps them in an object with handy functions
     const errors = validationResult(req);
       if (!errors.isEmpty()) {
       	//we get the errror and map out each error to get the error messsage
       return res.status(422).json({ errors: errors.array().map(error=>error.msg) });
  }
  //before we add to the user model we first check the database and ensure
  //we dont have a user already in the database
  //take alot of care because email is nested in local
  //so u must say local.email and it must be in quotes
  User.findOne({'local.email':email})
  .then(user=>{
    //console.log(user)
    if(user){
      return res.status(422).json({msg:'user already exists'})
    }
    //console.log('user doesnt exist')
     //if credentials are valid we place them in user model
    const newUser= new User({
      method:'local',
      local:{
        username,
         email,
         password
      }
    })
    //console.log(newUser)
    //hash the password which is taken care of using userSchema.pre()method
    //inthe use model
    //and save them to the db
    newUser.save()
    //after a successful creation we create a signed token and send it 
    //back to the client to be used for accessing protected routes
    .then(user=>{
      const token=signedToken(user)
      res.status(200).json({
        token:token
      })
    }).catch(err=>{
      console.log(err)
    res.status(500).json({error:err.message})
    })

  })

	},

//@route                  /users/signin
//@description             sign in up already user
//@access                  public
  signIn:(req,res)=>{
    //console.log('user',req.user)
     //so the user can be accessd using req.user
     //to create a signed token
     const user = req.user
     const token =signedToken(user)
     res.status(200).json({token:token})

     },
     //@route                  /users/oauth/google
     //@description             sign in up already user
    //@access                  public
    authGoogle:(req,res)=>{
      //console.log('contoller here')
      const user=req.user
      const token=signedToken(user)
      res.status(200).json({token:token})
    }
}