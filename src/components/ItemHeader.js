import React, { Component } from "react";
import './css/ItemHeader.css';

class ItemHeader extends Component {
    render() {
        return(
            <div>
                <div>
                    {this.props.name}
                </div>
            </div>
        )
    }
}

export default ItemHeader;