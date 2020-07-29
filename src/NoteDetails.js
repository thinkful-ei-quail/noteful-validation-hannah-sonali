import React from 'react';
import './NoteDetails.css'
import ApiContext from './ApiContext';
import API from './API';
import { format } from 'date-fns';

export default class NoteDetails extends React.Component {
  static contextType = ApiContext;

  static defaultProps = {
    onDelete: () => { },
  }
  handleDeleteClick = e => {
    e.preventDefault()
    const noteId = this.props.id
    fetch(`${API.api}/notes/${noteId}`,{
      method:"DELETE",
      headers:{
        "content-type":"application/json"
      }
    })
    .then(res => {
      if(!res.ok)
        return res.json().then(event => Promise.reject(event))
      return res.json()
    })
    .then(() => {
      this.contents.deleteNote(noteId)
      this.props.onDelete(noteId)
    })
    .catch(err => {
      console.error({err})
    })
  }

  render() {
    // const { noteId } = this.props.match.params;
    // const { notes = [] } = notes.context
    // const note = notes.find(note => note.id === noteId) || {};
    const {name, id, modified, content} = this.props
    return (
      <div className="note-detailed" key={id} id={id}>
        <div className="note-title">
          {name}
        </div>
        <div className="note-date">
          {/* Last modified on {format(modified, "Do MMM YYYY")} */}
        </div>
        <div className="note-content">
          {content}
        </div>
        <button className="delete_button" type="button" onClick={this.handleClickDelete}>
          Delete
        </button>
      </div>
    )
  }
}