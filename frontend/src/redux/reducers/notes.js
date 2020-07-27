//this is the notes reducer
//we have notes with a notes array and message property

import {GET_NOTES,GET_NOTE,DELETE_NOTE,CREATE_NOTE,NOTEBOOK_LIST,NOTE_ERROR,ADDTONOTEBOOK,CLEAR_ERRORS} from '../actions/types.js'
const initialState={
	notes:[],
	errorMsg:'',
	note:'',
	notebookList:[]
}
export default (state=initialState,action)=>{
	switch(action.type){
		case GET_NOTES:
		//console.log('hello')
		return {
			...state,
			notes:action.payload

		}
		case GET_NOTE:
		return {
			...state,
			note:action.payload
		}
		case CREATE_NOTE:
		return {
			...state,
			notes:[action.payload,...state.notes]
		}
		case DELETE_NOTE:
		 return {
		 	...state,
		 	msg:action.payload
		 }
		 case NOTEBOOK_LIST:
		 return {
		 	...state,
		 	notebookList:action.payload
		 }
		 case ADDTONOTEBOOK:
		  return {
		  	...state,
		  	errorMsg:""
		  }
        case NOTE_ERROR:
        return {
        	...state,
        	errorMsg:action.payload
        }
        case CLEAR_ERRORS:
        return {
        	errorMsg:""
        }
		default:
		return state
	}
}