//action creators  for users
//
import {SIGN_UP,SIGN_IN,SIGN_OUT,AUTH_ERROR} from './types.js'

import axios from 'axios'

//the signup function  is for new users who are just signing up
//in this function we send the user credentials to the backend
//if they are  valid we get a token back which we save in localStorage for subsequent requests
export const signUp=(user)=>{
	return async dispatch=>{
		await axios
				.post('http://localhost:5000/users/signup',user)
				.then(res=>{
					//console.log(res.data)
					dispatch({
						type:SIGN_UP,
						payload:res.data.token
					})
					localStorage.setItem('jwt',res.data.token)
				}).catch(err=>{
                   //console.log(err)
                   dispatch({
                   	type:AUTH_ERROR,
                   	payload:err.response.data.errors
                   })
				})
	}
}

//note the token has to be sent as access_token
export const googleAuth=(token)=>{
	return async dispatch=>{
		await axios
		         .post('http://localhost:5000/users/oauth/google',{access_token:token})
		         .then(res=>{
                   //console.log(res.data)
                   dispatch({
						type:SIGN_UP,
						payload:res.data.token
					})
					localStorage.setItem('jwt',res.data.token)
		         }).catch(err=>{
		         	console.log(err)
		         })
	}
}

export const signIn=(user)=>{
	return async dispatch=>{
		await axios
		         .post('http://localhost:5000/users/signin',user)
		         .then(res=>{
                   //console.log(res.data)
                   dispatch({
						type:SIGN_IN,
						payload:res.data.token
					})
					localStorage.setItem('jwt',res.data.token)
		         }).catch(err=>{
		         	//console.log(err)
		         	dispatch({
		         		type:AUTH_ERROR,
		         		payload:"Email and password do not match"
		         	})
		         })
	}
}
//we remove the token from localStorage
export const signOut=()=>{
	return dispatch=>{
		localStorage.removeItem('jwt')
		dispatch({
          type:SIGN_OUT,
          payload:''
		})
	}
}