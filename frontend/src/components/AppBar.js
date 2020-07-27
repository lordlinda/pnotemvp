import React,{Component} from 'react'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer'
import {compose} from 'redux'
import {connect} from 'react-redux'

import * as actions from '../redux/actions/users.js'

const styles={
	root:{
		flexGrow:1
	},
	title:{
		flex:1
	},
	drawer:{
		width:200,
		marginTop:60
	},
	link:{
		textDecoration:"none",
    color:"#fff"
	},
  drawerlink:{
    textDecoration:"none"
  }
}
//these are the text expressed in the sidebar and respective routes
const Options=[
{text:"All Notes" ,to:'/notes'},
{text:"All Notebooks" ,to:'/notebooks'},
{text:"All Stacks", to:'/stacks'},

]


class AppHeader extends Component{
	constructor(props){
		super(props)
		this.handleToggle=this.handleToggle.bind(this)
		this.ItemClick=this.ItemClick.bind(this)
    this.signOut=this.signOut.bind(this)
		this.state ={
			open:false
		}
	}
//handles both the opening and closing of athe drawer/sidebar
	handleToggle(){
		this.setState({open:!this.state.open})
		//console.log(this.state.open)
	}
    //this  is what ensures that after clicking a button on the drawer
    //it closes
	ItemClick(){
		this.setState({open:false})
	}

  signOut(){
    this.props.signOut()
  }
	render(){
		const {classes} =this.props

		const {open}=this.state
		return (
		<div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"
          color="inherit"
          aria-label="menu"
          onClick={this.handleToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pnote
          </Typography>
          {
            this.props.isAuth ?
             <Button color="inherit" onClick={this.signOut}>SignOut</Button>
               :null
          }
          {
            !this.props.isAuth ?
            [<a href='/signup' key='signup' className={classes.link}> <Button color="inherit">SignUp</Button></a>,
             <a href='/' key='signin' className={classes.link}> <Button color="inherit">SignIn</Button></a>
             ]
               :null
          }
        </Toolbar>
      </AppBar>

  {/*Drawer starts here*/}
   <Drawer open={open}
   onClose={this.handleToggle}
   >
    <Divider />
      <List className={classes.drawer}>
        {Options.map((option) => (
          <ListItem button
          key={option.text}
          onClick={this.ItemClick}
          >
            <a href={option.to} className={classes.drawerlink}><ListItemText primary={option.text} /></a>
          </ListItem>
        ))}
      </List>
          <Divider />

    </Drawer>
    </div>
		)
	}
}

function mapStateToProps(state){
  return {
    isAuth:state.users.isAuth
  }
}
export default compose(
	withStyles(styles),
  connect(mapStateToProps,actions)
)(AppHeader)