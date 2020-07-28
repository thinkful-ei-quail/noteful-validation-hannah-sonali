import React from 'react';
import data from './data';
import { Link } from 'react-router-dom';

import './NoteList.css';

export default class NoteList extends React.Component {

  render() {

    let noteDivs = data.notes;
    console.log("orig", noteDivs);

    const folderId = this.props.match.params.folderId;

    if (folderId) {
      console.log("notelist.js folderId", folderId);
      noteDivs = noteDivs.filter(note => note.folderId === folderId);
    }

    console.log("after filter", noteDivs);

    //do this for all or for filter
    noteDivs = noteDivs.map(note => {
      return (
        <div key={note.id} id={note.id} className='note'>
          <Link to={`/note/${note.id}`}>
            {note.name}
          </Link><br />
              Date modified on {note.modified.substr(0, 10)}
        </div>
      )
    })


    return (
      <>
        {noteDivs}
      </>
    )
  }
}