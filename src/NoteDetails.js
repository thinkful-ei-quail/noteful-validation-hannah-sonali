import React from 'react';

import data from './data';

export default class NoteDetails extends React.Component {

  render() {
    const { noteId } = this.props.match.params;
    {console.log("fancy noteId stuff", noteId)};
    const note = data.notes.find(note => note.id === noteId);
    return (
      <div>
        {note.name} &nbsp;&nbsp;&nbsp; 
        {note.modified.substr(0,10)}<br/>
        {note.content}
      </div>
    )
  }
}