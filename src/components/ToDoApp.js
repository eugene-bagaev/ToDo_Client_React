import React, { Component } from "react";
import './css/ToDoApp.css';
import ItemHeader from "./ItemHeader";
import ItemBody from "./ItemBody";
import NewItem from "./NewItem";
import ButtonNewNote from "./ButtonNewNote";
import axios from "axios";

const server = require('../utils/server');

class ToDoApp extends Component {

    constructor(props) {
        super(props);

        this.handleClickNewNote = this.handleClickNewNote.bind(this);
        this.handleClickSaveNote = this.handleClickSaveNote.bind(this);

        document.addEventListener('keyup', this.handleKeyPressOnBody);

        this.state.showNewBlock = false;
    }

    render() {
        return(
            <div className="main-div-todo-app" >
                <div>ToDo App Main Component</div>

                {/* NEW ACTION */}
                <div>
                    {this.state.showNewBlock ? <NewItem save={this.handleClickSaveNote}  /> : <ButtonNewNote new={this.handleClickNewNote} /> }
                </div>

                <div className="flex-container space-between">
                    {this.state.notes.map(
                        (item, index) => (
                            <div key={index} id={index} className="todo-item-main">
                                <div id={item._id} className="delete-action" title="Delete note" onClick={this.handleClickDeleteNote}>
                                    x
                                </div>
                                <ItemHeader name={item.name} />
                                <ItemBody items={item.items} />
                            </div>
                        )
                    )}
                </div>
            </div>
        )
    }

    handleClickDeleteNote = event => {
        const noteIdForDelete = event.target.id;
        this.deleteNoteFromDatabase(noteIdForDelete);
    };

    deleteNoteFromDatabase(noteId) {
        const callbackForDeleteNote = deleteResult => {
            console.log('Callback del success: ', deleteResult.data);
            if (deleteResult.data['ok'] === 1) {
                let notes = this.state.notes.filter(function (obj) {
                    return obj._id !== noteId;
                });
                this.setState({notes: notes});
            }
        };
        server.deleteNoteFromDatabaseHandler(noteId, callbackForDeleteNote);
    }

    handleClickNewNote() {
        this.setState({
            showNewBlock: true
        });
    }

    handleClickSaveNote(newNoteData) {
        this.setState({
            showNewBlock: false
        });
        let resultItemsListForNewNote = [];

        const newNoteActionItems = newNoteData.values;

        // eslint-disable-next-line no-unused-vars
        for (let [key, value] of newNoteActionItems) {
            resultItemsListForNewNote.push({
                "completed": false,
                "action": value,
                "completedDate": null,
                "backgroundColor": "#00cc00",
                "textColor": "#663300"
            });
        }

        let note = {
            name: newNoteData.noteName,
            wp: 'home',
            createdDate: new Date(Date.now()).toISOString(),
            modifiedDate: new Date(Date.now()).toISOString(),
            items: resultItemsListForNewNote
        };

        this.saveNoteInDatabase(note).then((result) => {
            console.log('Save state: ', result);

            if (result && result.status === 'SUCCESS' && result.data.length > 0) {
                this.setState({
                    notes: this.state.notes.concat(result.data[0])
                });

            }
        });
    }

    async saveNoteInDatabase(note) {
        const response = await axios.post(
            'http://localhost:3000/api/notes',
            note,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    }

    state = {
        notes: [],
        wps: [],
        users: [],
        showNewBlock: false
    };

    handleKeyPressOnBody = event => {
        if (event.key === '+' && !this.state.showNewBlock) {
            this.handleClickNewNote(event);
        }
    };

    componentDidMount() {
        const callbackFnGetAllNotes = data => {
            this.setState({
                notes: data.notes,
                wps: data.wps,
                users: data.users
            });
        };
        server.getAllNotesFromDatabase(callbackFnGetAllNotes);
    }
}

export default ToDoApp;