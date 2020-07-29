import React from 'react';
import { Link } from 'react-router-dom';
import './BackButton.css';
import ApiContext from './ApiContext';

export default class BackButton extends React.Component {
  static contextType = ApiContext;
  getFolderName(noteId) {
    return this.context.folders.find(folder => folder.id === noteId).name;
  }

  render() {
    const { noteId } = this.props.match.params;
    const note = this.context.notes.find(note => note.id === noteId);
    return (
      <>
        <Link to='/'>
          <div className="back-button">
            Back
          </div>
        </Link>
        <div className="folder-name">
          {this.getFolderName(note.folderId)}
        </div>
      </>
    )
  }
}