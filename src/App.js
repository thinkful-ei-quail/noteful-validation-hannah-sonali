import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import FolderSideBar from './FolderSideBar/FolderSideBar';
import NoteListMain from './NoteListMain/NoteListMain';
import NotePageNav from './NotePageNav/NotePagNav';
import NotePageMain from './NotePageMain/NotePageMain';
import ApiContext from './ApiContext';
import API from './API';

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
    const value={
      notes:this.state.notes, 
      folders:this.state.folders, 
      deleteNote:this.handleDeleteNote,
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
              <Route exact path='/' component={FolderSideBar}
              />  {/*List of folders*/}
              <Route path='/folder/:folderId' component={FolderSideBar}
              />
              <Route path='/note/:noteId' component={NotePageNav}
              />
            </nav>
            <main>
              <Route exact path='/' component={NoteListMain} /> {/* all notes */}
              <Route path='/folder/:folderId' component={NoteListMain}/>
              <Route path='/note/:noteId' component={NotePageMain}/>
            </main>
          </div>
        </div>
      </ApiContext.Provider>
    );
  }
}


/*
<Sidebar>
        <Route exact path='/' component='<FolderList />'
        />  {/*List of folders}
        <Route path='/folder' render='() => {
          aFoo={this.state.foos.find(foo => foo.id === routeProps.match.params.foodId)}
        }' /> {/*List of F's w active highlighte}
        <Route path='/note' render='() => {}' /> {/*Only current note}
      </Sidebar>
      <Main>
        <Route exact path='/' component={MainMain} /> {/* all notes }
        <Route path='/folder' render='() => {}' /> {/* notes in folder }
        <Route path='/note' render='() => {}' /> {/* note details }
      </Main>
*/
