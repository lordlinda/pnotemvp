import React,{Component} from 'react'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import EditSharpIcon from '@material-ui/icons/EditSharp'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import ReorderIcon from '@material-ui/icons/Reorder'
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



import * as actions from '../../redux/actions/notebooks.js'

//this only works for strings
truncate.setup({ stripTags:true ,length: 70 })

const styles={
  buttonEdit:{
    position:'sticky',
    bottom:'10px',
    float:"right",
    marginLeft:"20px"
  },
  buttonStack:{
    position:'sticky',
    bottom:'10px',
    float:"right",
    marginLeft:"20px"
  },
  buttonAdd:{
    position: 'sticky',
    bottom: '10px',
    float:"right"
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
    fontSize:"40px"
  }

}


class Notebook extends Component {
  constructor(props){
    super(props)
    this.state={
      title:this.props.notebook.title,
      open:false
    }
    //we bind non arrow function such that they are not declared undefined
    this.handleChange=this.handleChange.bind(this)
    this.handleToggle=this.handleToggle.bind(this)
    this.editNotebook=this.editNotebook.bind(this)

  }
   //this function is able to  store what the user types in
   //for the title
    handleChange(e){
    this.setState({title:e.target.value})
    //console.log(this.state)
    }
  //this is what opens and closes the modal
  //for editing the name of the notebook
  //we have to declare it as the onClick event on the button
    handleToggle(){
      this.setState({open:!this.state.open})
    }
   //this function is responsible for sending edited title of
   //the notebook to the backend
    editNotebook(){
       //first we ensure wedont have an empty string
     if(this.state.title !== ""){
     //first we close the modal
      this.setState({open:!this.state.open})

     //and then we create the notebook
     const id=this.props.match.params.id
     const notebook={
      title:this.state.title
     }
     this.props.editNotebook(id,notebook)
     }
    }
//when the page has just loaded we want to be get
//the notebook data from the backend
  async componentDidMount(){
  //  console.log(this.props.match.params.id)
    const id =  this.props.match.params.id
    await this.props.getNotebook(id)
  }

  render(){
   const {classes} =this.props
   const {open}=this.state
   const {_id,title,notes}= this.props.notebook
   //console.log(_id)
    return (
      <div className={classes.root}>
      {/*we display the title on the top part of the page*/}
      <h2 className={classes.heading}>{title}</h2>
      <span>
    {/*then we map out all the notes nested in that notebook*/}
      <List>
      {
        notes.map(note=>
        <div key={note._id} className={classes.item}>
        <a href={"/note/"+note._id} className={classes.note}>
        <h4 className={classes.title}>{note.title}</h4>
          <ListItem
          key={note._id}
          >
          <ListItemText primary={truncate(note.body)}/>
          </ListItem>
          </a>
         <Divider />
           </div>

          )
      }

            </List>
          {/*the list of notes ends here*/}
      </span>

    {/*the code below is for adding a  notebook to a stack when you click on it you are redirected to a list of available stacks*/}
      <Link to={'/notebook/stack/'+_id}>
    <Fab color="primary"  className={classes.buttonStack}>
          <ReorderIcon />
      </Fab>
      </Link>

      {/*the stack link ends here */}

      {/*the edit button is for changing the title of your notebook and it is modal popup where you edit the name of the notebook*/}
       <Fab color="primary" className={classes.buttonEdit} onClick={this.handleToggle}>
          <EditSharpIcon />
      </Fab>
    {/*this is the dialog for editing the notebook title*/}
       <Dialog open={open} onClose={this.handleToggle} aria-labelledby="form-dialog-title">
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
          <Button  color="primary" onClick={this.editNotebook}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    {/*the modal for changing the name of the notebook ends here*/}


    {/*the button for adding a new note to notebook
      it redirects you to the page of creating a new note
    */}
      <Link to={'/noteInNotebook/'+_id}>
       <Fab color="primary"
       aria-label="add"
       className={classes.buttonAdd}>
                 <AddIcon />
              </Fab>
              </Link>
       </div>
  )
  }
}
///the notebook component ends here

function mapStateToProps(state){
  return {
   notebook:state.notebooks.notebook
  }
}

export default compose(
withStyles(styles),
connect(mapStateToProps,actions)
)(Notebook)