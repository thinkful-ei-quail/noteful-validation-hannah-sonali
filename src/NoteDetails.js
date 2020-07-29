import React from 'react';
import data from './data';
import './NoteDetails.css'

export default class NoteDetails extends React.Component {

  render() {
    const { noteId } = this.props.match.params;
    const note = data.notes.find(note => note.id === noteId);
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