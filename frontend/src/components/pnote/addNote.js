import React,{Component} from 'react';
import { Editor } from 'react-draft-wysiwyg'
import { EditorState,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux'
import {compose} from 'redux'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import * as actions from '../../redux/actions/notes.js'
const styles={
  buttonSave:{
    position:'absolute',
    bottom:'10px',
    right:"2px"
  }
}


class CodeEditor extends Component {
  constructor(props){
    super(props)
      this.state = {
        //the initialState of the editor is this
        editorState:EditorState.createEmpty(),
        title:""
      }
      //we have to bind non arrow functions
      this.createNote=this.createNote.bind(this)
      this.handleChange=this.handleChange.bind(this)
  }

   onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    })

  }

  async createNote(){
 // console.log('button clicked')
  const rawContentState = convertToRaw(this.state.editorState.getCurrentContent())
  //first we want to ensure that if we have a title  of header-one or two then
  //it is the title of the note then we convert that raw content html
  const markup = draftToHtml(rawContentState)

  //console.log(JSON.stringify(markup))
  //console.log(this.state.title)

  const note ={
    title:this.state.title,
    body:markup
  }
  //we want to ensure that the user doesnt  save an empty body
  //so we only allow the note to be created when we  have  more than just
  //the paragraph tags that show up when the user has input nothing
  //the paragraph tags have a length of 8 that is why we say the length of the body has to be more than 8
  if(note.body.length > 8){
        //console.log('more than tags')
     await this.props.createNote(note)
     //and if we have create the note successfully we are redirected to the all notes page
    this.props.history.push('/notes')

  }
}

//the handleChange function handles the title input
    handleChange(e){
      this.setState({title:e.target.value})
  }

 async  componentDidMount(){
    await this.props.getNotes();
  }

  render(){
    //we destructure the editorState to place in  
    //the editorState of our editorComponent
    const { editorState } = this.state;
   const {classes} =this.props
    return (

            <div>
       <TextField
          placeholder="Title"
          fullWidth
          margin="normal"
          value={this.state.title}
          onChange={this.handleChange}
        />
    <Editor
     editorState={editorState}
     onEditorStateChange={this.onEditorStateChange}
     //toolbarOnFocus
    wrapperStyle={{
          margin: "0.8em",
          border:"1px solid #ccc",
          cursor:"text",
          minHeight:"350px",
          overflowY: "auto"

        }}
    hashtag={{
      separator: ' ',
      trigger: '#',
    }}
     mention={{
      separator: ' ',
      trigger: '@',
      //since not all notes have titles we have to filter the list to only return thise with titles
     suggestions:this.props.notes.filter(note=>note.title !== "").map(note=>{
        return {text:note.title,value:note.title,url:'/note/'+note._id}
      })
    }}
    toolbar={{
      options: ['inline', 'blockType', 'fontSize', 'fontFamily','list'],
      inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
        bold: { className: 'bordered-option-classname' },
        italic: { className: 'bordered-option-classname' },
        underline: { className: 'bordered-option-classname' },
        strikethrough: { className: 'bordered-option-classname' },
        code: { className: 'bordered-option-classname' },
      },
      blockType: {
        inDropdown:true,
        className: 'bordered-option-classname',
      },
      fontSize: {
        className: 'bordered-option-classname',
      },
      fontFamily: {
        className: 'bordered-option-classname',
      },
    }}

  />
    <Fab variant="extended"
    color="primary"
    aria-label="add"
    className={classes.buttonSave}
    onClick={this.createNote}
    >
          <NavigationIcon />
          save
        </Fab>
       </div>
  )
  }
}
//*end of the addNote component
function mapStateToProps(state){
  return {
    notes:state.notes.notes
  }
}
export default compose(
  withStyles(styles),
  connect(mapStateToProps,actions)
  )(CodeEditor)