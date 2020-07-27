//users reducers
import {SIGN_UP,SIGN_IN,SIGN_OUT,AUTH_ERROR} from '../actions/types.js'


const initialState={
	token:"",
	isAuth:false,
	errorMsg:[]
}


export default (state=initialState,action)=>{
	switch(action.type){
		case SIGN_UP:
		return {
			...state,
			token:action.payload,
			isAuth:true,
			errorMsg:""
		}
        case AUTH_ERROR:
        return {
        	...state,
        	errorMsg:[action.payload],
        	isAuth:false
        }
        case SIGN_IN:
        return {
        	...state,
        	token:action.payload,
        	isAuth:true
        }
        case SIGN_OUT:
        return {
        	...state,
        	token:"",
        	isAuth:false,
        	errorMsg:""
        }
       default:
	  return state
	}

}