import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import ValidationError from '../ErrorHandling/ValidationError'
import API from '../API';
import './AddFolder.css';


export default class AddFolder extends Component {
    static contextType = ApiContext;
    
    constructor (props) {
      super(props);
      this.state = {
        folderName: {value:'', touched: false}
      }
    }

    handleSubmit = e => {
        e.preventDefault();
        const newFolder ={
          name: e.target['form-folder'].value,
        }
        fetch(`${API.api}/folders`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          }, 
          body: JSON.stringify(newFolder)
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(event => Promise.reject(event))
            return res.json()
          })
          .then((folder) => {
            this.props.history.push('/');
            this.context.addFolder(folder);
          })
          .catch(err => {
            console.error({ err })
          
          })
    }

    updateFolderName(folderName) {
      this.setState({
        folderName: {value: folderName , touched: true}
      })
    }
    validateFolderName(){
      const folderNameCheck = this.state.folderName.value.trim()
      if(folderNameCheck.length === 0) {
        return 'Folder name is required'
      }
    } 
    
    render () {
      const folderNameError = this.validateFolderName();
      return (
        <section className="addFolder">
          <h2 className="createFolder">Create a folder</h2>
          <form className="addFolder-form" onSubmit={e => this.handleSubmit(e)}>
            <div className="field">
              <label htmlFor="form-folder">Name</label>
              <input type="text" id="form-folder" name="form-folder" onChange={e => this.updateFolderName(e.target.value)}/>
              {this.state.folderName.touched && (<ValidationError message={folderNameError}/>)}
            </div>
            <div className="buttons">
              <button type="submit" className="folderSubmit" disabled={this.validateFolderName()}>Submit</button>
            </div>
          </form>
        </section>
      )
    }
}