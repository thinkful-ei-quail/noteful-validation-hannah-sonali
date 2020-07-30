import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import FolderSideBar from './FolderSideBar/FolderSideBar';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageNav from './NotePageNav/NotePagNav';
import NotePageMain from './NotePageMain/NotePageMain';
import ApiContext from './ApiContext';
import AddNoteForm from './AddNote/AddNoteForm';
import AddFolder from './AddFolder/AddFolder';
import API from './API';
import './App.css';

export default class App extends Component {
  state = {
    notes:[],
    folders:[],
  }
  
  handleDeleteNote = noteId => {
    this.setState({
      notes:this.state.notes.filter(note => note.id !== noteId)
    })
  }
  handleAddNote = note => {
    this.setState({
      notes: this.state.notes.concat(note)
    })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: this.state.folders.concat(folder)
    })
  }

  componentDidMount(){
    Promise.all([fetch(`${API.api}/notes`),
      fetch(`${API.api}/folders`),
      ])
      .then(([notesRes, foldersRes]) => {
        if(!notesRes.ok){
          return notesRes.json()
          .then (err => Promise.reject(err))
        }
        if(!foldersRes.ok){
          return notesRes.json()
          .then (err => Promise.reject(err))
        }
        return Promise.all([
          notesRes.json(),
          foldersRes.json()
        ])
      })
      .then(([notes, folders]) => {
        setTimeout(() => this.setState({
          notes:notes, folders:folders
        }), 700)
      })
      .catch(err => {
        console.error(err)
      })
    
  }

  render() {
    console.log("Folders after render: ", this.state.folders)
    console.log("Notes after render: ",this.state.notes)
    const value={
      notes:this.state.notes, 
      folders:this.state.folders, 
      deleteNote:this.handleDeleteNote,
      addNote: this.handleAddNote,
      addFolder: this.handleAddFolder,
    }
    return (
      <ApiContext.Provider value = {value}>
        <div className="App">
          <header>
            <h1><Link to='/'>Noteful</Link></h1>
          </header>
          <hr />
          <div className="wrapper">
            <nav>
              <Route exact path='/' component={FolderSideBar}/>  {/*List of folders*/}
              <Route path='/folder/:folderId' component={FolderSideBar}/>
              <Route path='/note/:noteId' component={NotePageNav}/>
              <Route path='/addNote' component={NotePageNav} />
              <Route path='/addFolder' component={NotePageNav}/>

            </nav>
            <main>
              <Route exact path='/' component={NoteListMain} /> {/* all notes */}
              <Route path='/addNote' component={AddNoteForm} />
              <Route path='/addFolder' component={AddFolder}/>
              <Route path='/folder/:folderId' component={NoteListMain}/>
              <Route path='/note/:noteId' component={NotePageMain}/>
              
            </main>
          </div>
        </div>
      </ApiContext.Provider>
    );
  }
}
