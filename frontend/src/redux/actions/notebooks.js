import axios from  'axios'

import {GET_NOTEBOOKS,DELETE_NOTEBOOK,CREATE_NOTEBOOK,GET_NOTEBOOK,EDIT_NOTEBOOK,STACK_LIST,ADDTOSTACK,GET_NOTES,NOTEBOOK_ERROR} from './types.js'

//this function get all notebooks depending on the user
export const getNotebooks=()=>{
	return async dispatch=>{
        await axios
        .get('/notebooks')
        .then(res=>{
        	//console.log(res.data)
        	dispatch({
        		type:GET_NOTEBOOKS,
        		payload:res.data.notebooks
        	})

        }).catch(err=>{
        	console.log(err)
        })

	}
}

//this function gets a single notebook  depending on the id
export const getNotebook=(id)=>{
	return async dispatch=>{
        await axios
        .get(`/notebooks/${id}`)
        .then(res=>{
        	//console.log(res.data)
        	dispatch({
        		type:GET_NOTEBOOK,
        		payload:res.data.notebook
        	})


        }).catch(err=>{
        	console.log(err)
        })

	}
}

//this function creates a new notebook
export const createNotebook=(notebook)=>{
        return async dispatch=>{
                await  axios
                .post('/notebooks',notebook)
                .then(res=>{
                  //console.log(res.data)
                  dispatch({
                       type:CREATE_NOTEBOOK,
                        payload:res.data.notebook
                  })

                }).catch(err=>{
                    console.log(err)
                })
        }
}

//this function deletes a notebook depending on id
export const deleteNotebook=(id)=>{
        return async dispatch=>{
                await  axios
                .delete(`/notebooks/${id}`)
                .then(res=>{
                // console.log(res.data)
                  dispatch({
                       type:DELETE_NOTEBOOK,
                        payload:res.data.msg
                  })

                }).catch(err=>{
                        console.log(err)
                })
        }
}

//this function edits a notebook depending on id
export const editNotebook=(id,notebook)=>{
       // console.log(id,note)
        return async dispatch=>{
                await  axios
                .patch(`/notebooks/${id}`,notebook)
                .then(res=>{
                  console.log(res.data)
                  dispatch({
                      type:EDIT_NOTEBOOK,
                      payload:res.data.msg
                  })

                }).catch(err=>{
                   console.log(err)
                })
        }
}

//this function gets all the stacks where we can add our notebooks
export const getStackList=()=>{
  return async dispatch=>{
    await  axios
    .get('/stacks')
    .then(res=>{
      //console.log(res.data)
      dispatch({
        type:STACK_LIST,
        payload:res.data.stacks
      })
    }).catch(err=>{
      console.log(err)
    })
  }
}


//this is the function for adding a notebook to a stack
export const addToStack=(id,stack)=>{
  //console.log('add to stack')
  return async dispatch=>{
    await  axios
    .patch(`/notebooks/notebook/${id}`,{stack:stack})
    .then(res=>{
      dispatch({
        type:ADDTOSTACK,
        payload:res.data.msg
      })
    }).catch(err=>{
      //console.log(err.response.data.msg)
      dispatch({
       type:NOTEBOOK_ERROR,
        payload:err.response.data.msg
      })
    })
  }
}

//create new note in notebook
export const noteInNotebook=(id,note)=>{
 // console.log({notebook:notebook})
  return async dispatch=>{
    await  axios
    .patch(`/notebooks/note/notebook/${id}`,note)
    .then(res=>{
      console.log(res.data)
    }).catch(err=>{
      //console.log(err.response.data.msg)
     dispatch({
        type:NOTEBOOK_ERROR,
        payload:err.response.data.msg
      })
    })
  }
}

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