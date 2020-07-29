//in here we will be using strategies to authenticate users.
//we are going to use --passport local for local sign in not signup
//                      //for signin only because now we are verifying our  user
//                      so we do the check the username first  and then comapre the passport
//                      and if the user passes both tests only can we create a signed token
//                    --passport-google-token for googleauth
//                    --passport-jwt for accessing protected resources
const passport = require('passport')
const LocalStrategy =require('passport-local').Strategy
const GoogleTokenStrategy = require('passport-google-token').Strategy
const bcrypt =require('bcryptjs')


const User =require('../models/User.js')


//LOCAL STRATEGY
//for signin

passport.use(new LocalStrategy(
	{usernameField:'email'},//default is username we oveerride to accept email
   (email, password, done,res) => {
    //console.log(email)
   	//remember the email is nested in the local
   	//so we say local.email
   	//we place it in a string
   	//1.find user by request email value
  User.findOne({'local.email':email },(err,user)=>{
  	//console.log(user)
  	//if error we handle it
       if(err){
       //	console.log('first error')
       	return  done(err)
       }
       //if there is no user we return false
       if(!user){
       	//console.log('no user')
       	return done(null,false,{message:'user not found'})
       }
       //console.log('user here')
       //if we continue down here it means the user has been found
       //so now we go to compare passwords
       //dont forget the password is nested in the local object
       bcrypt.compare(password,user.local.password,(err,isMatch)=>{
       	if(err){
       		//console.log('error here')
       		//if error we handle it
       		return done(null,false,{message:'Incorrect password'})
       	}
          if(isMatch){
            //console.log(user)
              //if user has been found and password match we return user
          return done(null,user)
          }
       })

  })

}))
//console.log(process.env.SECRET,process.env.CLIENT_ID,process.env.CLIENT_ID)
// =======GOOGLE STRATEGY========
passport.use(new GoogleTokenStrategy({
    clientID:process.env.CLIENT_ID ,
    clientSecret:process.env.CLIENT_SECRET 
  },
  function(accessToken, refreshToken, profile, done) {
     //console.log(profile)
    // 1.so the first thing is to look through the database
    // and see if we have a user using id of the google method
    // 2.if the user exists we return user
    // 3.if the user doesnt exist  we create one and return the user
    User.findOne({'google.id':profile.id},(err,user)=>{
    	if(err){
        //console.log('first error',err)
    		//if we have an error we return false
    		return done(err,false)
    	}
    	//if user we return user which we can access using req.user
    	if(user){
        //console.log('user')

    		return done(null,user)
    	}

    	//we create new user
    	const newUser = new User({
    		method:'google',
    		google:{
    			id:profile.id,
    			email:profile.emails[0].value,

    		}
    	})
         //we save the user to the databse
        //since the method is google it will skip  the hashing passwod method
    	newUser.save()
    	.then(user=>{
    		//console.log(user)
    		return done(null,user)
    	}).catch(err=>{
    		//console.log('error')
    		return done(err,null)
    	})
    })

  }
));

//// =======PASSPORT-JWT STRATEGY========
///for access to protected resources
var JwtStrategy = require('passport-jwt').Strategy
const {ExtractJwt} = require('passport-jwt')
//the jwt stategy takes in  an options object
//and a verify function
//and verify function which returns the decoded jwt payload
passport.use(new JwtStrategy({
//we use authorization with a lowercase a not A
	jwtFromRequest:ExtractJwt.fromHeader('authorization'),
	secretOrKey:process.env.SECRET,
},(payload,done)=>{
	//console.log('here')
	//we return the user
	User.findById(payload.sub,(err,user)=>{
		//console.log(user)
		if(err){
			//console.log('error')
			//if we have an error we return error
			return done(err,false)
		}
		//if we get the user we return user
		if(user){
			//console.log('user')
			return done(null,user)
		}else{
			return done(null,false)
		}
	})
}))

