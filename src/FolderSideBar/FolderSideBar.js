import React from 'react';
import { Link } from 'react-router-dom';
import './FolderSideBar.css';
import ApiContext from '../ApiContext';

export default class FolderSideBar extends React.Component {
  static contextType = ApiContext;
  render() {
    const { folders = [] } = this.context
    const folderId = this.props.match.params.folderId;
    return (
      <nav className="folderList">
        {folders.map(folder =>
          <Link to={`/folder/${folder.id}`} className={folderId === folder.id ? 'folder-active' : 'folder'} key={folder.id}>
            {folder.name}
          </Link>
        )}
        <div className="buttons">
          <Link to={`/addFolder`}>
            <button
              className="addFolder-button"
              type="button">
              Add Folder
            </button>
          </Link>
        </div>
      </nav>
    )
  }
}
