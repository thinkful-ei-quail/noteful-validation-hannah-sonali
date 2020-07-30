import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import API from '../API';
import ValidationError from '../ErrorHandling/ValidationError'
import './AddNoteForm.css';

export default class AddNoteForm extends Component {
    static contextType= ApiContext;

    constructor (props) {
      super(props);
      this.state = {
        noteName: {value:'', touched: false},
        content: {value:'', touched: false},
        select: {value:'', touched: false},
      }
    }

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
    
    updateFormName(name) {
      this.setState({
        noteName: {value: name , touched: true}
      })
      console.log(this.state.noteName)
    }

    updateContent(content) {
      this.setState({
        content: {value: content, touched: true}
      })
      console.log(this.state.content)
    }

    updateSelect(folder){
      this.setState({
        select: {value: folder, touched: true}
      })
      console.log(this.state.select)
    }


    validateName() {
      const nameCheck = this.state.noteName.value.trim()
      if(nameCheck.length === 0) {
        return 'Name is required'
      }
    }

    validateContent(){
      const contentCheck = this.state.content.value.trim()
      if(contentCheck.length === 0) {
        return 'Content is required'
      }
    }    
    
    validateSelect(){
      const selectCheck = this.state.select.value
      if(selectCheck.length === 0) {
        return 'Folder is required'
      }
    }
 
 
 render () {
  const { folders } = this.context
  const nameError = this.validateName();
  const contentError = this.validateContent();
  const selectError = this.validateSelect();
    if(!folders) {
      return '';
    }
    return (
      <section className="addNote">
        <h2 className="createNote">Create a note</h2>
        <form className="addNote-form" onSubmit={e => this.handleSubmitClick(e)}>
          <div className="field">
            <label htmlFor="form-name">Name</label>
            <input type="text" id="form-name" name="form-name" onChange={e => this.updateFormName(e.target.value)}/>
            {this.state.noteName.touched && (<ValidationError message={nameError}/>)}
            <label htmlFor="form-content">Content</label>
            <textarea id="form-content" name="form-content" onChange={e => this.updateContent(e.target.value)}/>
            {this.state.content.touched && (<ValidationError message={contentError}/>)}
            <label htmlFor="form-select">Folder</label>
            <div className="select-wrapper">
              <select id="form-select" name="form-select" onChange={e => this.updateSelect(e.target.value)}>
                {folders.map(folder =>
                  <option key={`${folder.id}`} value={`${folder.id}`}>{`${folder.name}`}</option>
                )}
              </select>
              {this.state.select.touched && (<ValidationError message={selectError}/>)}
            </div>
          </div>
          <div className="buttons">
            <button type="submit" className="noteSubmit" 
              disabled={this.validateName() ||
              this.validateContent() ||
              this.validateSelect()}>
                Submit
            </button>
          </div>
        </form>
      </section>
    )
    }
}

