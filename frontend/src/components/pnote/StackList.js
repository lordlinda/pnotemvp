import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import {connect} from 'react-redux'
import {compose} from 'redux'

import * as actions from '../../redux/actions/notebooks.js'

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


class StackList extends Component {
  constructor(props){
    super(props)
      this.state = {
       stack:"",
      }
      this.handleChange=this.handleChange.bind(this)
  }
 async handleChange(e){
    this.setState({stack:e.target.value})


  }

  async componentDidMount(){
    await this.props.getStackList()
  }
  async componentDidUpdate(){
    const id =this.props.match.params.id
    const stack=this.state.stack

   if(stack !== ""){
    //console.log(stack)
    await this.props.addToStack(id,stack)
   }
  }

  render(){
   const {classes} =this.props
   //console.log(this.state)
  //console.log(this.props.error)
 const {stacks}=this.props
    return (
      <div className={classes.root}>
      {
        stacks.length  === 0  ?
        <p>you have no stacks</p>
        :null
      }

        {
        stacks.length  > 0  ?
         <FormControl component="fieldset">
      <FormLabel component="legend"><h1>Choose Stack</h1></FormLabel>
      <RadioGroup aria-label="stack" name="stack"value={this.state.stack} onChange={this.handleChange}>
      {
        stacks.map(stack=>{
        return <FormControlLabel value={stack._id} control={<Radio />} label={stack.name} key={stack._id} />
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
    stacks:state.notebooks.stackList,
    error:state.notebooks.errorMsg
  }
}
export default compose(
withStyles(styles),
connect(mapStateToProps,actions)
)(StackList)