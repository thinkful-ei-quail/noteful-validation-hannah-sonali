import React from 'react';
import { Link } from 'react-router-dom';
import data from './data';
import './BackButton.css';

export default class BackButon extends React.Component {
  getFolderName(noteId) {
    // console.log("noteId", noteId);
    // const folderToFind = data.folders.find(folder => folder.id === noteId);
    // console.log("folderToFind", folderToFind);
    // return folderToFind.name;
    return data.folders.find(folder => folder.id === noteId).name;
  }

  render() {
    const { noteId } = this.props.match.params;
    const note = data.notes.find(note => note.id === noteId);
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