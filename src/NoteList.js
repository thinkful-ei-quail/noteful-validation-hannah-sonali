import React from 'react';
import './NoteList.css';
import ApiContext from './ApiContext';
import {getNotesFolder} from './Helper';
import NoteDetails from './NoteDetails';
import {Link} from 'react-router-dom';

export default class NoteList extends React.Component {
  static contextType = ApiContext;
  static defaultProps = {match:{params:{}}}
  handleDeleteNote = noteId => {
    this.props.history.push("/")
  }
  render() {
    const{folderId} = this.props.match.params
    const{notes=[]} = this.context
    const noteFolder = getNotesFolder(notes, folderId)

    return (
      <div className="noteList-wrapper">
        <ul className="noteList">
          {noteFolder.map(note => 
            <li key={note.id}>
              <NoteDetails  name={note.name} id={note.id} modified={note.modified}>
                
                <Link to={`/note/${note.id}`}>
                  {note.name}
                </Link>
                  
              </NoteDetails>
              <button className="delete_button" type="button" onClick={this.handleDeleteNote}>
                Delete
              </button>
            </li>  
          )}
        </ul>
      </div>
    )
    // noteDivs = noteDivs.map(note => {
    //   return (
    //     <Link to={`/note/${note.id}`}>
    //       <div className='note' key={note.id} id={note.id}>
    //         {note.name}
    //         <div className="noteList-modified">
    //         Modified on {format(modified, "Do MMM YYYY")}
    //         </div>
    //         <button class="delete_button" type="button" onClick={this.handleClickDelete}>
    //           Delete
    //         </button>
    //       </div>

    //     </Link>
    //   )
    }


    // return (
    //   <>
    //     {noteDivs}
    //   </>
    // )
  }
