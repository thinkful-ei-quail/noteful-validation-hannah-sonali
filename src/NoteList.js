import React from 'react';
import data from './data';

export default class NoteList extends React.Component {
  
    noteDivs = data.notes.map(note => {
      return (
        <div key={note.id} id={note.id} className='note'>
          {note.name}<br/>
          Date modified on {note.modified.substr(0,10)}
        </div>
      )
    })
  
    render() {    
      return (
        <>
          {this.noteDivs}
        </>
      )
    }
  }