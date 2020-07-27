 import React,{Component} from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import truncate from 'truncate-html'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {connect} from 'react-redux'
import {compose} from 'redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import * as actions  from '../../redux/actions/notebooks.js'

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
		position:"sticky",
		bottom:"10px",
		float:'right'
	},
	item:{
		paddingLeft:'40px',
		paddingTop:"20px",
		display:'grid',

	},note:{
		textDecoration:"none",
		color:"#000",

	}
}


class Notebooks extends Component{
	constructor(props){
    super(props)
    this.state={
    	title:"",
    	open:false
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleToggle=this.handleToggle.bind(this)
    this.createNotebook=this.createNotebook.bind(this)
    this.deleteNotebook =this.deleteNotebook.bind(this)
  }
  //when  we open the page we want to see the notebooks
  //so we pick them from the backend
	async componentDidMount(){
     await  this.props.getNotebooks()
	}

  //this function is to delete a notebook
   async deleteNotebook(id){
    	//console.log(id)
    	await this.props.deleteNotebook(id)

    }
   //this function is what  stores what the user types in the title space
    handleChange(e){
    this.setState({title:e.target.value})
   // console.log(this.state)
    }
   //this function is responsible for opening and closing the modal
   //for creating a new notebook
    handleToggle(){
    	this.setState({open:!this.state.open})
    }
    //this is the function is for creating a new notebook
    createNotebook(){
      //first we ensure wedont have an empty string
     if(this.state.title !== ""){
       // console.log('here')
        //first we close the modal
      this.setState({open:!this.state.open})
      //and then we create the notebook
      const notebook={
        title:this.state.title
      }
      this.props.createNotebook(notebook)

     }
    }

	render(){
		//console.log(this.props.notebooks)
		const {classes} =this.props
      const {open }=this.state
		return (
			<div>
    {/*we map the list of notebooks */}
			<List>
			{
				this.props.notebooks.map(notebook=>
           <div key={notebook._id} className={classes.item}>
           <a href={"/notebook/"+notebook._id} className={classes.note}>
           <h4 className={classes.title}>{notebook.title}({notebook.notes.length})</h4></a>
					<IconButton aria-label="delete"
					onClick={this.deleteNotebook.bind(this,notebook._id)}
					>
          <DeleteIcon />
          </IconButton>
					 <Divider />
					 </div>
					)
			}
            </List>
            <div>
          {/*the button is one the user clicks to add a new notebook*/}
	      <Fab color="primary"
        aria-label="add"
        className={classes.button}
        onClick={this.handleToggle}>
            <AddIcon />
         </Fab>
       {/*this is the dialog for creating a new notebook*/}
        <Dialog open={open}
        onClose={this.handleToggle}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Notebook</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="notebook"
            label="title"
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button  color="primary" onClick={this.createNotebook}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    {/*the dialog ends here*/}
    </div>
			</div>
			)
	}
}

function mapStateToProps(state){
	return {
    notebooks:state.notebooks.notebooks
	}
}

export default compose(
withStyles(styles),
connect(mapStateToProps,actions)
)(Notebooks)

