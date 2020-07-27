//this is the notebooks reducer

import {GET_NOTEBOOKS,GET_NOTEBOOK,DELETE_NOTEBOOK,CREATE_NOTEBOOK,STACK_LIST,NOTEBOOK_ERROR,GET_NOTES} from '../actions/types.js'
const initialState={
	notebooks:[],
	errorMsg:'',
	notebook:{notes:[],title:""},
	stackList:[],
	notes:[],
	msg:""
}
export default (state=initialState,action)=>{
	switch(action.type){
		case GET_NOTEBOOKS:
		//console.log('hello')
		return {
			...state,
			notebooks:action.payload

		}
		case GET_NOTEBOOK:
		return {
			...state,
			notebook:action.payload
		}
		case CREATE_NOTEBOOK:
		return {
			...state,
			notebook:action.payload
		}
		case DELETE_NOTEBOOK:
		 return {
		 	...state,
		 	msg:action.payload
		 }
		 case STACK_LIST:
		 return {
		 	...state,
		 	stackList:action.payload
		 }
        case NOTEBOOK_ERROR:
        return {
        	...state,
        	errorMsg:action.payload
        }
        case GET_NOTES:
        return {
        	...state,
        	notes:action.payload
        }
		default:
		return state
	}
}