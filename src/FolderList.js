import React from 'react';
import {Link} from 'react-router-dom';
import './FolderList.css';
import ApiContext from './ApiContext';

export default class FolderList extends React.Component {
  static contextType = ApiContext;
  render() {
    const { folders=[], notes=[]} = this.context   
    const folderDivs = folders.map(folder => {
      let folderClass = 'folder'
      const folderId = this.props.match.params.folderId;
  
      if(folderId === folder.id) {
        folderClass = 'activeFolder';
      }

      return (
        <Link to={`/folder/${folder.id}`}> 
          <div key={folder.id} id={folder.id} className={folderClass} >
            {folder.name}
          </div>
        </Link>
      )
    })
    
    return (
      <>
        {folderDivs}
      </>
    )
  }
}