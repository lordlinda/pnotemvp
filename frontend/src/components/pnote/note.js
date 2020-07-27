import React,{Component} from 'react';
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import PostAddIcon from '@material-ui/icons/PostAdd';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'

import * as actions from '../../redux/actions/notes.js'
const styles={
  buttonEdit:{
    position:'absolute',
    bottom:'10px',
    right:"2px",
  },
  buttonAdd:{
    position:'absolute',
    bottom:'10px',
    right:"80px",
  },
  root:{
    paddingLeft:'12px'
  },
}


class Note extends Component {
 // constructor(props){
   // super(props)
 // }

  async componentDidMount(){
  //  console.log(this.props.match.params.id)
    const id =  this.props.match.params.id
    await  this.props.getNote(id)
  }

  render(){
   const {classes} =this.props
   const {title,body,_id} = this.props.note
    return (
      <div className={classes.root}>
    {/*we display the title at the top of the page*/}
      <h2>{title}</h2>
    {/*we display the body in a span tag*/}
      <span>{body}</span>
    {/*this is the  button that the user clicks on to add a note to a note*/}
      <Link to={'/note/notebooks/'+_id}>
         <Fab color="primary"  className={classes.buttonAdd}>
            <PostAddIcon />
          </Fab>
      </Link>
    {/*this is the button for editing a note*/}
      <Link to={'/editnote/'+_id}>
        <Fab color="primary" className={classes.buttonEdit}>
           <EditSharpIcon />
       </Fab>
      </Link>
       </div>
       )
  }
}

function mapStateToProps(state){
  return {
    note:state.notes.note
  }
}

export default compose(
withStyles(styles),
connect(mapStateToProps,actions)
)(Note)