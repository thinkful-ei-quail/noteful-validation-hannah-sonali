import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import FolderList from './FolderList';
import NoteList from './NoteList'
import BackButton from './BackButton';
import NoteDetails from './NoteDetails';
import ApiContext from './ApiContext';
import Data from './Data';
import API from './API';

export default class App extends React.Component {
  state = {
    notes:[],
    folders:[],
  }

  // handleSetState = (notes,folders) => {
  //   this.setState({
  //     notes:notes,
  //     folders:folders,
  //   })
  // }
  
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
        console.log(notes, folders);
        setTimeout(() => this.setState({
          notes:notes, folders:folders
        }), 700)
      })
      .catch(err => {
        console.log('Danger will robinson')
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
              <Route exact path='/' component={FolderList}
              />  {/*List of folders*/}
              <Route path='/folder/:folderId' component={FolderList}
              />
              <Route path='/note/:noteId' component={BackButton}
              />
            </nav>
            <main>
              <Route exact path='/' component={NoteList} /> {/* all notes */}
              <Route path='/folder/:folderId' component={NoteList}/>
              <Route path='/note/:noteId' component={NoteDetails}/>
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
