//this is the stacks reducer

import {GET_STACKS,GET_STACK,DELETE_NOTEBOOK,CREATE_NOTEBOOK,STACK_LIST,NOTEBOOK_ERROR,GET_NOTES} from '../actions/types.js'
const initialState={
	stacks:[],
	errorMsg:'',
	stack:{notebooks:[],name:""},
	notes:[],
	msg:""
}
export default (state=initialState,action)=>{
	switch(action.type){
		case GET_STACKS:
		//console.log('hello')
		return {
			...state,
			stacks:action.payload

		}
		case GET_STACK:
		return {
			...state,
			stack:action.payload
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