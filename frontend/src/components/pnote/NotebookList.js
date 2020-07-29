import React,{Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import {connect} from 'react-redux'
import {compose} from 'redux'

import * as actions from '../../redux/actions/notes.js'

const styles={
  root:{
    textAlign:"center",
    marginTop:"50px"
  },
  error:{
    marginTop:'50px',
    color:"orange"
  }
}
class NotebookList extends Component {
  constructor(props){
    super(props)
      this.state = {
       notebook:"",
       open:false,
       error:""
      }
      this.handleChange=this.handleChange.bind(this)
      this.handleClose=this.handleClose.bind(this)
  }
   handleChange(e){
    this.setState({notebook:e.target.value})

  }

  async componentDidMount(){
    await this.props.getNotebookList()
  }
  async componentDidUpdate(){
    const id =this.props.match.params.id
    const notebook=this.state.notebook
//console.log(id)
   if(notebook !== ""){
    //console.log('notebook')
    await this.props.addToNotebook(id,notebook)
   }
  }
 handleClose(){
  console.log('button clicked')
   // this.setState({open:true})

  }

  render(){
   const {classes} =this.props
  // console.log(this.state)
 // console.log(this.props.error)
    return (
      <div className={classes.root}>
      {
        this.props.notebooks.length  === 0  ?
        <p>you have no notebooks</p>
        :null
      }

        {
        this.props.notebooks.length  > 0  ?
         <FormControl component="fieldset">
      <FormLabel component="legend"><h1>Choose Notebook</h1></FormLabel>
      <RadioGroup aria-label="notebook" name="notebook"value={this.state.value} onChange={this.handleChange}>
      {
        this.props.notebooks.map(notebook=>{
        return <FormControlLabel value={notebook._id} control={<Radio />} label={notebook.title} key={notebook._id} />
        })
      }
      </RadioGroup>
    </FormControl>
        :null
      }
       {/*we want to display the error */}
         {
          this.props.error ?
          <p className={classes.error}>{this.props.error}</p>
          :null
         }
       </div>
  )
  }
}

function mapStateToProps(state){
  return {
    notebooks:state.notes.notebookList,
    error:state.notes.errorMsg
  }
}
export default compose(
withStyles(styles),
connect(mapStateToProps,actions)
)(NotebookList)