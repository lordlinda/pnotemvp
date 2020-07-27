import React,{Component} from 'react';
import { Editor } from 'react-draft-wysiwyg'
import { EditorState,ContentState,convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import debounce from 'lodash.debounce'
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {compose} from 'redux'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import * as actions from  '../../redux/actions/notes.js'
const styles={
  buttonSave:{
    position:'absolute',
    bottom:'10px',
    right:"2px"
  },

}


class CodeEditor extends Component {
  constructor(props){
    super(props)
    if(this.props.note === ''){
      return {
        editorState:EditorState.createEmpty()
      }
    }
     const blocksFromHtml = htmlToDraft(this.props.note.body)
      // console.log(blocksFromHtml)
     const { contentBlocks, entityMap } = blocksFromHtml
     const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
     // console.log(contentState)
       //console.log(EditorState.createWithContent(contentState))
      const editorState = EditorState.createWithContent(contentState)

      this.state = {
        editorState:editorState,
        title:this.props.note.title
      }
            this.handleChange=this.handleChange.bind(this)
            this.editNote=this.editNote.bind(this)
  }

   onEditorStateChange: Function = (editorState) => {
  const  rawContentState = convertToRaw(editorState.getCurrentContent())
   this.editNote(rawContentState)
    this.setState({
      editorState,
      title:this.state.title
    })

  }
   handleChange(e){
      this.setState({title:e.target.value})
      console.log(this.state.title)
  }


  async componentDidMount(){
    //we need to have the notes array for the suggestions in hash
    this.props.getNotes()
      const id = this.props.match.params.id
      //console.log(id)

     await this.props.getNote(id)
  }

//the debounce function is what ensures that the function is only run every after the given time
  editNote=debounce((content)=>{
    const markup = draftToHtml(content)
    const id = this.props.match.params.id
     const note={
      title:this.state.title,
      body:markup
     }

   this.props.editNote(id,note)
  },4000)


  render(){
//console.log(this.props.notes)
    const {_id} =this.props.note
    const { editorState } = this.state;
   const {classes} =this.props
    return (
   <div>
 {/*this is the input for the title*/}
     <TextField
          placeholder="Title"
          fullWidth
          margin="dense"
          value={this.state.title}
          onChange={this.handleChange}
        />
      {/*this editor component shows the editor with the necessary styles*/}
  <Editor
  editorState={editorState}
   onEditorStateChange={this.onEditorStateChange}
    toolbarOnFocus
     wrapperStyle={{
          margin: "0.8em",
          border:"1px solid #ccc",
          cursor:"pointer",
          height:"400px",
          overflowY: "auto"

        }}
    hashtag={{
      separator: ' ',
      trigger: '#',
      //since not all notes have titles we have to filter the list to only return thise with titles
      suggestions:this.props.notes.map(note=>{
        return {text:note.body,value:note.body,url:'href'}
      })

    }}
     mention={{
      separator: ' ',
      trigger: '@',
      // first filter through the notes to get those with titiles
      suggestions:this.props.notes.filter(note=>note.title !== "").map(note=>{
        return {text:note.title,value:note.title,url:'/note/'+note._id}
      })
    }}
    toolbar={{
      options: ['inline', 'blockType', 'fontSize', 'fontFamily'],
      inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
        bold: { className: 'bordered-option-classname' },
        italic: { className: 'bordered-option-classname' },
        underline: { className: 'bordered-option-classname' },
        strikethrough: { className: 'bordered-option-classname' },
        code: { className: 'bordered-option-classname' },
      },
      blockType: {
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
       className={classes.buttonSave}
       component={Link}
       to={'/note/'+_id}
       > Go back
        </Fab>
       </div>
  )
  }
}

function mapStateToProps(state){
  return {
    note:state.notes.note,
    notes:state.notes.notes
  }
}
export default compose(
  withStyles(styles),
  connect(mapStateToProps,actions)
  )(CodeEditor)