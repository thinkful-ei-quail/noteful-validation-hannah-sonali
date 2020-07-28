import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import FolderList from './FolderList';
import NoteList from './NoteList'
import BackButton from './BackButton';
import NoteDetails from './NoteDetails';



export default class App extends React.Component {

  render() {
    return (
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
