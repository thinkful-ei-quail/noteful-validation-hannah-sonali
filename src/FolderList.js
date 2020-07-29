import React from 'react';
import { Link } from 'react-router-dom';
import './FolderList.css';
import ApiContext from './ApiContext';

export default class FolderList extends React.Component {
  static contextType = ApiContext;
  render() {
    const { folders = [], notes = [] } = this.context
    // let folderClass = 'folder'
    // const folderId = this.props.match.params.folderId;

    // if (folderId === folder.id) {
    //   folderClass = 'activeFolder';
    // }

    return (
      <div className="folderList-nav">
        <ul className="folderList-list">
          {folders.map(folder =>
            <li key={folder.id}>
              <Link to={`/folder/${folder.id}`} className="folder-link">
                {folder.name}
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}