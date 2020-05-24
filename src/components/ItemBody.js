import React, { Component } from "react";
import './css/ItemBody.css';
import Item from "./Item";

class ItemBody extends Component {
    render() {
        return(
            <div>
                {this.props.items.map(
                    (item, index) => (
                        <div key={index}>
                            <Item item={item} />
                        </div>
                    )
                )}
            </div>
        )
    }
}

export default ItemBody;