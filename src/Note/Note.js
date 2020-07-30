import React from 'react';
import { Link } from 'react-router-dom';
import './Note.css'
import ApiContext from '../ApiContext';
import API from '../API';

export default class Note extends React.Component {
  static contextType = ApiContext;
  static defaultProps = {
    onDeleteNote: () => {}
  }
  handleDeleteClick = e => {
    e.preventDefault()
    const noteId = this.props.id
    console.log(this.props)

    fetch(`${API.api}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(event => Promise.reject(event))
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(noteId)
        this.props.onDeleteNote(noteId)
      })
      .catch(err => {
        console.error({ err })
      })
  }

  render() {
    const { name, id, modified } = this.props;
    return (
      <div className="note-detailed">
        <h2 className='note-title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button 
          className="delete_button"
          type="button" 
          onClick={this.handleDeleteClick}
        >
          Delete
        </button>
      <p className="note-modified">{modified}</p>
      </div>
    )
  }
}