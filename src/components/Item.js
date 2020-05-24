import React, { Component } from "react";
import './css/Item.css';

class Item extends Component {
    render() {
        return(
            <div>
                <input type="checkbox" defaultChecked={this.props.item.completed} />
                <span className={this.props.item.completed ? 'line-through' : ''}>{this.props.item.action}</span>
            </div>
        )
    }
}

export default Item;