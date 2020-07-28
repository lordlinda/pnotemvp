import React,{Component} from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom'
import truncate from 'truncate-html'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux'
import {compose} from 'redux'

import * as actions  from '../../redux/actions/notes.js'

//this only works for strings
truncate.setup({ stripTags:true ,length: 70 })

const styles={
	title:{
		float:'left',
		paddingLeft:"15px",
		fontSize:"22px",
		textDecoration:"none",
		color:'#000',
		marginBottom:'-10px'

	},
	button:{
		//the sticky part is to allow it to move along with the notes
		position:"sticky",
		bottom:"10px",
		float:'right'
	},
	item:{
		paddingLeft:'40px',
		paddingTop:"20px",
		display:'flex',

	},note:{
		textDecoration:"none",
		color:"#000",

	}
}


class Notes extends Component{
	constructor(props){
    super(props)
    this.deleteNote =this.deleteNote.bind(this)
  }
  //when the page loads we pick our notes from the backend
	async componentDidMount(){
     await  this.props.getNotes()
	}

 //this deletes a note
   async deleteNote(id){

    	console.log(id)
    	await this.props.deleteNote(id)

    }

	render(){
		console.log(this.props.notes)
		const {classes} =this.props
		return (
			<div>
			<List>
			{
				this.props.notes.map(note=>
                     <div key={note._id} className={classes.item}>
                     <a href={"/note/"+note._id} className={classes.note}>
                     <h4 className={classes.title}>{note.title}</h4>
					<ListItem
					key={note._id}
					>
				{/*we use the truncate-function to reduce the number of text showing in the body*/}
					<ListItemText primary={truncate(note.body)}
					 />
					</ListItem>
					</a>
				{/*so when we bid the delete function from here it ensure that when we click on the delete button we just get the id of the note we have clicked on*/}
					<IconButton aria-label="delete"
					onClick={this.deleteNote.bind(this,note._id)}
					>
                      <DeleteIcon />
                     </IconButton>
					 <Divider />
					 </div>

					)
			}

            </List>
          {/*this is the button that redirects us to the page where we can create a note*/}
          {/*since it is among our declared routes inApp.js we can  use thr route from react-router-dom*/}
			<Link to='/createNote' >
			 <Fab color="primary"
			 aria-label="add"
			 className={classes.button}
			 >
                 <AddIcon />
              </Fab>
              </Link>
			</div>
			)
	}
}

function mapStateToProps(state){
	return {
		notes:state.notes.notes
	}
}

export default compose(
withStyles(styles),
connect(mapStateToProps,actions)
)
(Notes)

