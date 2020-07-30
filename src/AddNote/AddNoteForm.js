import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';
import API from '../API';
import './AddNoteForm.css';

//need help with validation of classes

export default class AddNoteForm extends Component {
    static contextType= ApiContext;

    handleSubmitClick = e => {
        e.preventDefault();
        const newNote ={
          name: e.target['form-name'].value,
          content: e.target['form-content'].value,
          folderId: e.target['form-select'].value,
          modified: new Date(),
        }
    
        fetch(`${API.api}/notes`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          }, 
          body: JSON.stringify(newNote)
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(event => Promise.reject(event))
            return res.json()
          })
          .then((note) => {
            this.props.history.push('/');
            this.context.addNote(note);
          })
          .catch(err => {
            console.error({ err })
          })
    }
 
    render () {
        const { folders } = this.context
        if(!folders) {
          return '';
        }
        return (
            <section className="addNote">
                <h2 className="createNote">Create a note</h2>
                <form className="addNote-form" onSubmit={e => this.handleSubmitClick(e)}>
                    <div className="field">
                      <label htmlFor="form-name">Name</label>
                      <input type="text" id="form-name" name="form-name"/>
                      <label htmlFor="form-content">Content</label>
                      <textarea id="form-content" name="form-content"/>
                      <label htmlFor="form-select">Folder</label>
                      <div className="select-wrapper">
                        <select id="form-select" name="form-select">
                          {folders.map(folder =>
                            <option value={`${folder.id}`}>{`${folder.name}`}</option>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="buttons">
                      <button type="submit" className="noteSubmit">Submit</button>
                    </div>
                </form>
            </section>
        )
    }
}

