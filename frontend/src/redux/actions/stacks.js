import axios from  'axios'

import {GET_STACKS,DELETE_STACK,CREATE_STACK,GET_STACK,EDIT_STACK,STACK_LIST} from './types.js'

//this function get all stacks depending on the user
export const getStacks=()=>{
  return async dispatch=>{
        await axios
        .get('/stacks')
        .then(res=>{
          //console.log(res.data)
          dispatch({
            type:GET_STACKS,
            payload:res.data.stacks
          })

        }).catch(err=>{
          console.log(err)
        })

  }
}

//this function gets a single nstack  depending on the id
export const getStack=(id)=>{
//  console.log(id)
  return async dispatch=>{
        await axios
        .get(`/stacks/${id}`)
        .then(res=>{
          //console.log(res.data)
          dispatch({
            type:GET_STACK,
            payload:res.data.stack
          })
        }).catch(err=>{
          console.log(err)
        })

  }
}

//this function creates a new stack
export const createStack=(stack)=>{
        return async dispatch=>{
                await  axios
                .post('http://localhost:5000/stacks',stack)
                .then(res=>{
                  //console.log(res.data)
                  dispatch({
                       type:CREATE_STACK,
                        payload:res.data.stack
                  })

                }).catch(err=>{
                    console.log(err)
                })
        }
}

//this function deletes a stack depending on id
export const deleteStack=(id)=>{
        return async dispatch=>{
                await  axios
                .delete(`/stacks/${id}`)
                .then(res=>{
               // console.log(res.data)
                  dispatch({
                       type:DELETE_STACK,
                        payload:res.data.msg
                  })

                }).catch(err=>{
                        console.log(err)
                })
        }
}

//this function edits a stack depending on id
export const editStack=(id,stack)=>{
       // console.log(id,note)
        return async dispatch=>{
                await  axios
                .patch(`/stacks/${id}`,stack)
                .then(res=>{
                  //console.log(res.data)
                  dispatch({
                      type:EDIT_STACK,
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
      console.log(res.data)
      dispatch({
        type:STACK_LIST,
        payload:res.data.stacks
      })
    }).catch(err=>{
      console.log(err)
    })
  }
}



