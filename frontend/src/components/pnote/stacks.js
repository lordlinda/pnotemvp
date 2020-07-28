 import React,{Component} from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {connect} from 'react-redux'
import {compose} from 'redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import * as actions  from '../../redux/actions/stacks.js'

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


class Stacks extends Component{
	constructor(props){
    super(props)
    this.state={
    	name:"",
    	open:false
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleToggle=this.handleToggle.bind(this)
    this.createStack=this.createStack.bind(this)
    this.deleteStack =this.deleteStack.bind(this)
  }
  //when we load the stacks page we want to retrieve
  //the stacks
	async componentDidMount(){
     await  this.props.getStacks()
	}

//this function deletes a stack
   async deleteStack(id){
     //console.log(id)
   await this.props.deleteStack(id)

    }
    ///this function is what  captures the title for our new
    ///stack
    handleChange(e){
    this.setState({name:e.target.value})
   // console.log(this.state)
    }
  //this function helps in  closing and opening the modal
  //for creating a new stack
    handleToggle(){
    	this.setState({open:!this.state.open})
    }
//this function is for creating a new stack
    async createStack(){
      //first we ensure wedont have an empty string
     if(this.state.name !== ""){
        console.log('here')
        //first we close the modal
      this.setState({open:!this.state.open})
           //and then we create the notebook
           const stack={
            name:this.state.name
           }
           //console.log(this.props)
          await this.props.createStack(stack)
     }

    }

	render(){
		const {classes} =this.props
      const {open }=this.state
      //console.log(this.props.stacks)
		return (
			<div>
    {/*we map out our stacks*/}
			<List>
			{
				this.props.stacks.map(stack=>
         <div key={stack._id} className={classes.item}>
          <a href={"/stack/"+stack._id} className={classes.note}>
           <h4 className={classes.title}>
           {stack.name}({stack.notebooks.length})
           </h4>
           </a>
         {/*we bind the function from here such that on clicking the button 
         we only pick the id of the note we want to delete*/}
					<IconButton aria-label="delete"
					onClick={this.deleteStack.bind(this,stack._id)}
					>
          <DeleteIcon />
          </IconButton>
					 <Divider />
					 </div>

					)
			}

            </List>
          {/*mapping a list ends here*/}
            <div>
          {/*this add button here when you click the modal with a form pops up
          that is why it has an onClick function with handleToggle function*/}
	      <Fab color="primary"
        aria-label="add"
        className={classes.button}
        onClick={this.handleToggle}>
            <AddIcon />
         </Fab>
       {/*the form modal starts here it takes in the name of the stack*/}

        <Dialog open={open}
        onClose={this.handleToggle}
        aria-labelledby="form-dialog-title">

        <DialogTitle id="form-dialog-title">New Stack</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="stack"
            label="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
      {/*the button you see here is what allows us to create a stack*/}
          <Button
          color="primary"
          onClick={this.createStack}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    {/*the modal ends here*/}
    </div>
			</div>
			)
	}
}

function mapStateToProps(state){
	return {
		stacks:state.stacks.stacks
	}
}

export default compose(
withStyles(styles),
connect(mapStateToProps,actions)
)
(Stacks)

