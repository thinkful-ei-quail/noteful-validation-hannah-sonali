import React from 'react';
import data from './Data';
import { Link } from 'react-router-dom';
import './NoteList.css';
import API from './API';
import ApiContext from './ApiContext';

export default class NoteList extends React.Component {
  static contextType = ApiContext;
  static defaultProps = {handleDeleteNote:() => {}}
  handleClickDelete = e => {
    e.preventDefault();
    const noteId = this.props.id
    fetch(`${API.api}/notes/${noteId}`, {
      method:"DELETE",
      headers:{"content-type":"application/json"}
    })
    .then(res => {
      if(!res.ok){
        return res.json()
        .then(err => Promise.reject(err))
      }
      return res.json()
    })
    .then(() => {
      this.context.deleteNote(noteId)
      this.props.handleDeleteNote(noteId)
    })
    .catch(err => {
      console.error(err)
    })
  }
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
            Modified on {note.modified.substr(0, 10)}
            </div>
            <button class="delete_button" type="button" onClick={this.handleClickDelete}>
              Delete
            </button>
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