import React from 'react';
import { Link } from 'react-router-dom';
import './NotePageNav.css';
import ApiContext from '../ApiContext';
import {findFolder, findNote} from '../Helper';


export default class NoteSideBar extends React.Component {
  static contextType = ApiContext;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
      <>
        <Link to='/'>
          <div className="back-button">
            Back
          </div>
        </Link>
        { folder && (
          <h2 className="folder-name">
            {folder.name}
          </h2>
        )}
      </>
    )
  }
}