import React, { Component } from "react";

class ButtonNewNote extends Component {
    render() {
        return(
            <div>
                <button type="button" onClick={this.props.new}>New note</button>
            </div>
        )
    }
}

export default ButtonNewNote;