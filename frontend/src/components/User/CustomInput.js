import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles={
		input:{
	 borderRadius: 4,
   // backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: 'auto',
   padding: '10px 12px',
		}
	}


class MyCustomInput extends Component {

  render() {
    const { input: { value, onChange } } = this.props
    const {classes}=this.props
    return (
      <div>
        <input
        name={this.props.name}
        type={this.props.type}
        className={classes.input}
        value={value}
        onChange={onChange}
         />
      </div>
    )
  }
}

export default withStyles(styles)(MyCustomInput)


