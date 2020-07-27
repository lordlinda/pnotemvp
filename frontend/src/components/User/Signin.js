import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import {compose} from 'redux'
import { withStyles } from '@material-ui/core/styles'
import GoogleLogin from 'react-google-login'
import {connect} from 'react-redux'


import * as actions from '../../redux/actions/users.js'
import  CustomInput from './CustomInput.js'


const style={
    margin:'30px 30px',
    height:"180px",
    padding:"10px",
    border:"1px solid #ced4da",
    textAlign:"center"
 }


 const customStyle={
  button:{
    marginTop:"20px"
  },
  root:{
    textAlign:"center"
  }, list:{
    listStyle:"none",
    color:'red'
  },
 }
class SignIn extends React.Component {
 constructor(props){
    super(props)
    this.onSubmit=this.onSubmit.bind(this)
    this.responseGoogle =this.responseGoogle.bind(this)
  }
  async onSubmit(data){
    //console.log(data)
  await this.props.signIn(data)
    //if we dont have any authentication error we go to the notes page
   if(this.props.error.length === 0){
    this.props.history.push('/notes')
   }

  }
  //this is for google signup
  async responseGoogle(res){
   //console.log(res.accessToken)
   await this.props.googleAuth(res.accessToken)
     //if we dont have any authentication error we go to the notes page
   if(this.props.error.length === 0){
    this.props.history.push('/notes')
   }

  }
  render(){
  const { handleSubmit } = this.props
   const {classes}=this.props
   console.log(this.props.error)
  return (
    <div className={classes.root}>
    <form onSubmit={handleSubmit(this.onSubmit)} style={style}>
      <div>
        <label>Email:</label>
        <div>
          <Field
            name="email"
            component={CustomInput}
            type="email"
            placeholder="email"
          />
        </div>
      </div>
      <div>
        <label>Password:</label>
        <div>
          <Field
            name="password"
            component={CustomInput}
            type="password"
            placeholder="password"
          />
        </div>
      </div>
      {
      this.props.error ?
      <ul className={classes.list}>{this.props.error.map(error=>{
        return <li key={error} className='error'>{error}</li>
      })}</ul>
      :null
    }
      <Button
      variant="outlined"
      color="primary"
      type="submit"
      className={classes.button}
      >
        Sign up
      </Button>
    </form>
    
            <Divider variant="middle" />

  {/*or sign up using google*/}
 <GoogleLogin
    clientId="388882204865-apne36v947drgn6937k63ueme0e7eim6.apps.googleusercontent.com"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    render={renderProps => (
     <Button
        variant="contained"
        color="secondary"
        onClick={renderProps.onClick}
        className={classes.button}
      >
        Continue with Google
      </Button>
    )}
  />
</div>
  )
}
}

function mapStateToProps(state){
  return {
    error:state.users.errorMsg
  }
}
export default compose(
  reduxForm({
  form: 'signin',
}),
  withStyles(customStyle),
  connect(mapStateToProps,actions)
  )(SignIn)
