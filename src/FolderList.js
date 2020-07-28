import React from 'react';
import data from './data';

export default class FolderList extends React.Component {

  folderDivs = data.folders.map(folder => {
    return (
      <div key={folder.id} id={folder.id} className='folder'>
        {folder.name}
      </div>
    )
  })

  render() {    
    return (
      <>
        {this.folderDivs}
      </>
    )
  }
}