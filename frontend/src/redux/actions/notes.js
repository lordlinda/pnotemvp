import axios from  'axios'

import {GET_NOTE,DELETE_NOTE,GET_NOTES,EDIT_NOTE,CREATE_NOTE,NOTEBOOK_LIST
,NOTE_ERROR,ADDTONOTEBOOK} from './types.js'

//this function get all notes depending on the user
export const getNotes=()=>{
	return async dispatch=>{
        await axios
        .get('/notes')
        .then(res=>{
        	//console.log(res.data.notes)
        	dispatch({
        		type:GET_NOTES,
        		payload:res.data.notes
        	})

        }).catch(err=>{
        	console.log(err)
        })

	}
}

//this function gets a single note  depending on the id
export const getNote=(id)=>{
	return async dispatch=>{
        await axios
        .get(`/notes/${id}`)
        .then(res=>{
        	//console.log(res.data)
        	dispatch({
        		type:GET_NOTE,
        		payload:res.data.note
        	})


        }).catch(err=>{
        	console.log(err)
        })

	}
}

//this function creates a new note
export const createNote=(note)=>{
        return async dispatch=>{
                await  axios
                .post('/notes',note)
                .then(res=>{
                  //console.log(res.data)
                  dispatch({
                        type:CREATE_NOTE,
                        payload:res.data.note
                  })

                }).catch(err=>{
                        console.log(err)
                })
        }
}

//this function deletes a note depending on id
export const deleteNote=(id)=>{
        return async dispatch=>{
                await  axios
                .delete(`/notes/${id}`)
                .then(res=>{
                 // console.log(res.data)
                  dispatch({
                       type:DELETE_NOTE,
                        payload:res.data.msg
                  })

                }).catch(err=>{
                        console.log(err)
                })
        }
}

//this function edits a note depending on id
export const editNote=(id,note)=>{
       // console.log(id,note)
        return async dispatch=>{
                await  axios
                .patch(`/notes/${id}`,note)
                .then(res=>{
                  //console.log(res.data)
                  dispatch({
                      type:EDIT_NOTE,
                      payload:res.data.msg
                  })

                }).catch(err=>{
                        console.log(err)
                })
        }
}

export const getNotebookList=()=>{
  return async dispatch=>{
    await  axios
    .get('/notebooks')
    .then(res=>{
      //console.log(res.data)
      dispatch({
        type:NOTEBOOK_LIST,
        payload:res.data.notebooks
      })
    }).catch(err=>{
      console.log(err)
    })
  }
}

export const addToNotebook=(id,notebook)=>{
 // console.log({notebook:notebook})
  return async dispatch=>{
    await  axios
    .patch(`/notes/note/${id}`,{notebook:notebook})
    .then(res=>{
      //console.log(res.data)
      dispatch({
          type:ADDTONOTEBOOK,
          payload:res.data.msg
      })
    }).catch(err=>{
      //console.log(err.response.data.msg)
      dispatch({
        type:NOTE_ERROR,
        payload:err.response.data.msg
      })
    })
  }
}

