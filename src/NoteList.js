import React from 'react';
import data from './data';
import { Link } from 'react-router-dom';

import './NoteList.css';

export default class NoteList extends React.Component {

  noteDivs = data.notes;

  folderId = this.props.match.params.folderId;

  //only filter if folderId is passed in

  if(folderId) {
    console.log("notelist.js folderId", folderId);
    this.noteDivs = this.noteDivs.filter(note => note.folderId === folderId);
  }
  
  //do this for all or for filter
    noteDivs = data.notes.map(note => {
      return (
        <div key={note.id} id={note.id} className='note'>
          <Link to={`/note/${note.id}`}>
          {note.name}
          </Link><br/>
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