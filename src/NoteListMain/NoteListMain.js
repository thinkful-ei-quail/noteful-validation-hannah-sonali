import React from 'react';
import './NoteListMain.css';
import ApiContext from '../ApiContext';
import { getNotesFolder } from '../Helper';
import Note from '../Note/Note';

export default class NoteListMain extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folderId } = this.props.match.params
    const { notes } = this.context
    const noteFolder = getNotesFolder(notes, folderId)

    return (
      <section className="NoteListMain">
        <ul className="noteList">
          {noteFolder.map((note) => (
            <li key={note.id}>
              <Note id={note.id} name={note.name} modified={note.modified}/>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}