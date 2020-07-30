import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import API from '../API';
import './AddFolder.css';


export default class AddFolder extends Component {
    static contextType = ApiContext;

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

    render () {
        return (
            <section className="addFolder">
                <h2 className="createFolder">Create a folder</h2>
                <form className="addFolder-form" onSubmit={e => this.handleSubmit(e)}>
                    <div className="field">
                        <label htmlFor="form-folder">Name</label>
                        <input type="text" id="form-folder" name="form-folder" required/>
                    </div>
                    <div className="buttons">
                        <button type="submit" className="folderSubmit">Submit</button>
                    </div>
                </form>
            </section>
        )
    }
}