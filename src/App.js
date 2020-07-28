import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import FolderList from './FolderList';
import NoteList from './NoteList'


function App() {
  return (
    <div className="App">
      <header>
        <h1>Noteful</h1>
      </header>
      <hr/>
      <div className="wrapper">
        <nav>
          <Route exact path='/' component={FolderList}
          />  {/*List of folders*/}
        </nav>
        <main>
          <Route exact path='/' component={NoteList} /> {/* all notes */}
        </main>
      </div>
    </div>
  );
}

export default App;


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
