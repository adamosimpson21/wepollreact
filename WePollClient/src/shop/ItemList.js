import React, {Component} from 'react'
import './ItemList.css'
import ItemPlacard from "./ItemPlacard";

class ItemList extends Component{
  render(){
    if(this.props.items !== undefined){
      const allItems = this.props.items.map(item => (
        <ItemPlacard
          key={item._id}
          {...item}
          onDelete={this.props.deleteItem.bind(this, item._id)}
          onIncrement = {this.props.onIncrement.bind(this, item)}
        />
      ))
      return(<div className='itemList'>{allItems}</div>)
    } else {
      return(<div>Loading Items...</div>)
    }
  }
}

export default ItemList;