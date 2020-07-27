import React,{Component} from 'react'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import EditSharpIcon from '@material-ui/icons/EditSharp'
import {connect} from 'react-redux'
import {compose} from 'redux'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import truncate from 'truncate-html'



import * as actions from '../../redux/actions/stacks.js'

//this only works for strings
truncate.setup({ stripTags:true ,length: 70 })

const styles={
  buttonEdit:{
    position:'absolute',
    bottom:'10px',
    right:"2px",
  },
  buttonAdd:{
    position: 'absolute',
    bottom: '10px',
    right: '80px',
  },
  root:{
    paddingLeft:'12px'
  },
  note:{
    textDecoration:"none",
    color:"#000",

  },
  item:{
    paddingLeft:'40px',
    paddingTop:"20px",
    display:'flex',
  },
  title:{
    float:'left',
    paddingLeft:"15px",
    fontSize:"22px",
    textDecoration:"none",
    color:'#000',
    marginBottom:'-10px'

  },
  heading:{
    textAlign:"center",
    fontSize:"22px"
  }

}



class Stack extends Component {
  constructor(props){
    super(props)
    this.state={
      name:this.props.stack.name,
      open:false,
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleToggle=this.handleToggle.bind(this)
   this.editStack=this.editStack.bind(this)
  }
   //this function works hand in hand with the editNotebook function
  //it captures the title of the notebook
      handleChange(e){
    this.setState({name:e.target.value})
    //console.log(this.state)
    }
    //this function opens and closes the modal where we edit the notebook modal
    handleToggle(){
      this.setState({open:!this.state.open})
    }
 

  //this is the function for editing the modal
    async editStack(){
      //close modal
      this.setState({open:!this.state.open})

       //first we ensure wedont have an empty string
     if(this.state.title !== ""){
     //first we close the modal
      this.setState({open:!this.state.open})

     //and then we create the stack
     const id=this.props.match.params.id
     const stack ={
      name:this.state.name
     }
      await this.props.editStack(id,stack)
     }
    }
  
  async componentDidMount(){
  //console.log(this.props)
    const id =  this.props.match.params.id
    //console.log(id)
    await  this.props.getStack(id)
  }

  render(){
   // console.log(this.state.isOpen)
   const {classes} =this.props
   const {open}=this.state
   const {name,notebooks}= this.props.stack

   //console.log(this.props.stack)
    return (
      <div className={classes.root}>
    {/*at the top of the page we display the title of the stack*/}
      <h2 className={classes.heading}>{name}</h2>
      <span>
      <List>
      {
        notebooks.map(notebook=>
        <div key={notebook._id} className={classes.item}>
         <a href={"/notebook/"+notebook._id} className={classes.note}>
          <ListItem
          key={notebook._id}
          >
          <ListItemText primary={notebook.title}
           />
          </ListItem>
          </a>
          <Divider />
           </div>
          )
      }
            </List>
      </span>

      {/*the edit button is for changing the name of your stack and it is modal popup where you edit the name of the stack*/}
       <Fab color="primary"
       className={classes.buttonEdit}
       onClick={this.handleToggle}>
          <EditSharpIcon />
      </Fab>
    {/*this is the dialog for editing the stack name*/}

       <Dialog open={open}
       onClose={this.handleToggle}
       aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Stack</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="stack"
            label="title"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
          color="primary"
          onClick={this.editStack}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    {/*the modal for changing the name of the stack ends here*/}

       </div>
      
  )
  }
}

function mapStateToProps(state){
  return {
    stack:state.stacks.stack
  }
}

export default compose(
withStyles(styles),
connect(mapStateToProps,actions)
)(Stack)