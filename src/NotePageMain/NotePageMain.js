import React from 'react';
import Note from '../Note/Note';
import './NotePageMain.css';
import AppContext from '../ApiContext';
import { findNote } from '../Helper'

export default class NotePageMain extends React.Component {
    static contextType = AppContext;
    static defaultProps = {
        match: { params: {} },
        note: { content: '' }
    };

    handleDeleteNote = () => {
        this.props.history.push('/');
    }

    render() {
        const { notes = [] } = this.context;
        const { noteId } = this.props.match.params;
        const note = findNote(notes, noteId);
        if(!note) {
            return '';
        }
        return (
            <section className="NotePageMain">
                <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    onDeleteNote={this.handleDeleteNote}
                />
                <div className="NotePaigeMain-content">
                    {note.content.split(/\n \r|\n/).map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </section>
        )
    }
}

NotePageMain.defaultProps = {
    note: {
        content: "",
    }
}