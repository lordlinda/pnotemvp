import {combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import notesReducer from './notes.js'
import notebooksReducer from './notebooks.js'
import stacksReducer  from './stacks.js'
import userReducer from './users.js'

const rootReducer= combineReducers({
	form:formReducer,
	notes:notesReducer,
	notebooks:notebooksReducer,
	stacks:stacksReducer,
	users:userReducer
})

export default rootReducer