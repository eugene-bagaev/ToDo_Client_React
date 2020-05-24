import React, { Component } from "react";
import './css/NewItem.css';

class NewItem extends Component {

    constructor() {
        super();

        this.changeNoteName = this.changeNoteName.bind(this);
        const values = new Map();

        this.state = {
            noteName : '',
            noteItems: [],
            items: [],
            values: values
        };
    }

    render() {
        return(
            <div className="new-item-container">
                <div className="new-item">
                    {/* NEW NOTE HEADER */}
                    <div>
                        <input type="text" placeholder="Note name" value={this.state.noteName}
                               onKeyPress={this.onKeyPressHandler} autoFocus={true} onChange={this.changeNoteName}/>
                    </div>

                    {/* NEW NOTE BODY */}
                    <div>
                        <div className="add-item-link" onClick={this.createNoteItem}>+ add task</div>
                        <div>
                            {
                                this.state.noteItems.map((input, index) => (
                                    <input type="text" placeholder="Action" key={index}
                                           onKeyPress={this.onKeyPressHandler} autoFocus={true}
                                           onChange={this.changeNoteItems} name={input}/>
                                ))
                            }
                        </div>
                    </div>
                </div>

                {/* NEW NOTE FOOTER */}
                <div>
                    <button type="button" onClick={() => this.props.save(this.state)}>Save note</button>
                </div>
            </div>
        )
    }

    changeNoteItems = event => {
        const inputValue = event.target.value;
        const inputIndex = event.target.name;
        const values = this.state.values;

        values.set(inputIndex, inputValue);

        this.setState({
            values: values
        });
    };

    createNoteItem = event => {
        let array       = this.state.items;
        let itemIndex   = `Item#${this.state.items.length}`;

        array.push(
            itemIndex
        );

        this.setState({
            noteItems: array
        });
    };

    onKeyPressHandler = event => {
        if (event.key === 'Enter') {
            this.createNoteItem(event);
        } else if (event.ctrlKey) {
            this.props.save(this.state);
        }
    };

    changeNoteName = event => {
        this.setState({
            noteName: event.target.value
        })
    };
}

export default NewItem;