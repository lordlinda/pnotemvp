const mongoose =require('mongoose')
const bcrypt = require('bcryptjs')
//create User schema
const userSchema = mongoose.Schema({
    method:{
    	type:String,
    	enum:['local','google']
    },
    local:{
    	username:{
    		type:String,
    	},
    	email:{
    		type:String,
    	},
    	password:{
    		type:String,
    	},
    },
    google:{
    	id:{
    		type:String,
    	},
    	email:{
    		type:String,
    	}
    }


})


//so we are going to hash our password before saving it in the database
//in this case we use a normal function and not an arrow function
userSchema.pre('save',function(next){
   //if we are signing up using google we wont have a password
   //so no need for hasshing password
   if(this.method !=='local'){
     return next();
   }

  //console.log('hash password')
   //console.log(this.local.password)
   bcrypt.hash(this.local.password, 10,(err, hash) =>{
    if(err){
      return  console.error(err)
    }
    // Store hash in your password DB.
    //console.log(hash)
     this.local.password =hash
    //this next is very important
    next();
  });

})
//make sure to export model after the method
//create model from schema and export model
module.exports = mongoose.model('User',userSchema)
