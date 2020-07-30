import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getNotesFolder } from '../Helper';
import ApiContext from '../ApiContext';
import Note from '../Note/Note';
import './NoteListMain.css';

export default class NoteListMain extends Component {
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
          <li>
            <Link to={`/addNote`}>
              <button 
                className="addNote-button"
                type="button" 
                onClick={this.handleAddClick}>
                Add Note
              </button>
            </Link>
          </li>
        </ul>
      </section>
    )
  }
}