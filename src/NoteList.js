import React from 'react';
import data from './data';
import { Link } from 'react-router-dom';
import './NoteList.css';

export default class NoteList extends React.Component {

  render() {
    let noteDivs = data.notes;
    const folderId = this.props.match.params.folderId;

    if (folderId) {
      noteDivs = noteDivs.filter(note => note.folderId === folderId);
    }

    //do this for all or for filter
    noteDivs = noteDivs.map(note => {
      return (
        <Link to={`/note/${note.id}`}>
          <div className='note' key={note.id} id={note.id}>
            {note.name}
            <div className="noteList-modified">
              Date modified on {note.modified.substr(0, 10)}
            </div>
          </div>

        </Link>
      )
    })


    return (
      <>
        {noteDivs}
      </>
    )
  }
}