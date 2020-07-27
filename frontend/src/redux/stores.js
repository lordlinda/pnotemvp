
import {createStore,applyMiddleware} from 'redux'
import  reduxThunk from 'redux-thunk'
import axios from 'axios'
import rootReducer from './reducers/index.js'


const token =localStorage.getItem('jwt')
//console.log(token)
axios.defaults.headers.common["Authorization"]=token
const store=createStore(rootReducer,{
	//whenever we refresh the user authentication goes back to false even though the user is still logged in sucessfully
	//with the presence of a token
	//therefore we want to ensure that the user is authenticated based on if they still have the token
	users:{
		token:token,
		isAuth:token ? true :false,
		errorMsg:[]
	}
},applyMiddleware(reduxThunk))

export default store