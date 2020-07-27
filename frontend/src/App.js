import React from 'react'
import {BrowserRouter as Router ,Route} from 'react-router-dom'
import {Provider} from 'react-redux'

import AppHeader from './components/AppBar.js'
import SignUp from './components/User/Signup.js'
import Signin from './components/User/Signin.js'
import Notes from './components/pnote/notes.js'
import Editor from './components/pnote/addNote.js'
import CodeEditor from './components/pnote/editNote.js'
import Note from './components/pnote/note.js'
import NotebookList from './components/pnote/NotebookList.js'
import StackList from './components/pnote/StackList.js'
import  Notebooks from './components/pnote/notebooks.js'
import Notebook from './components/pnote/notebook.js'
import Stacks from './components/pnote/stacks.js'
import Stack from './components/pnote/Stack.js'
import  noteInNotebook from './components/pnote/noteInNotebook.js'
import authGuard from './components/HOCS/authGuard.js'
import store from './redux/stores.js'
function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <AppHeader />
      <Router>
      <Route exact path='/notes' component={authGuard(Notes)} />
      <Route exact path='/signup' component={SignUp}/>
      <Route exact path= '/' component={Signin}/>
      <Route exact path='/createNote' component={authGuard(Editor)}/>
      <Route exact path='/editnote/:id' component={authGuard(CodeEditor)}/>
      <Route exact path='/note/:id' component={authGuard(Note)}/>
      <Route exact path='/note/notebooks/:id' component={authGuard(NotebookList)}/>
      <Route exact path='/notebooks' component={authGuard(Notebooks)}/>
      <Route exact path='/notebook/:id' component={authGuard(Notebook)}/>
      <Route exact path='/notebook/stack/:id' component={authGuard(StackList)}/>
      <Route exact path='/stacks' component={authGuard(Stacks)} />
      <Route exact path='/stack/:id' component={authGuard(Stack)} />
      <Route exact path='/noteInNotebook/:id' component={authGuard(noteInNotebook)}/>
      </Router>
    </div>
    </Provider>
  );
}

export default App
