import React, {Component} from 'react'
import './ItemList.css'
import ItemPlacard from "./ItemPlacard";
import { removeItem } from '../store/actions/items'
import connect from 'react-redux/es/connect/connect'

class ItemList extends Component{
  render(){
    const {items } = this.props
    if(items.length>0){
      const { items } = this.props
      console.log("items is :", items)
      const allItems = items.map(item => (
        <ItemPlacard
          key={item._id}
          {...item}
          onDelete={this.props.removeItem.bind(this, item._id)}
        />
      ))
      return(<div className='itemList'>{allItems}</div>)
    } else {
      return(<div>Loading Items...</div>)
    }
  }
}

function mapStateToProps(state){
  return {
    items: state.items,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { removeItem })(ItemList);