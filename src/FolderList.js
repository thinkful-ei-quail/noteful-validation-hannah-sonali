import React from 'react';
import data from './data';
import {Link} from 'react-router-dom';
import './FolderList.css';

export default class FolderList extends React.Component {

  render() {   
    
    const folderDivs = data.folders.map(folder => {
  
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