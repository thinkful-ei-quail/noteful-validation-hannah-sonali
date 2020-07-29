import React from 'react';
import './NoteDetails.css'
import ApiContext from './ApiContext';

export default class NoteDetails extends React.Component {
  static contextType = ApiContext;
    
    handleDeleteNote = noteId => {
      
    }
    
    render() {
    const { noteId } = this.props.match.params;
    const {notes = []} = notes.context
    const note = notes.find(note => note.id === noteId) || {};
    
    return (
      <div className="note-detailed">
        <div className="note-title">
          {note.name}
        </div>
        <div className="note-date">
          Last modified on {note.modified.substr(0,10)}
        </div>
        <div className="note-content">
          {note.content}
        </div>
      </div>
    )
  }
}