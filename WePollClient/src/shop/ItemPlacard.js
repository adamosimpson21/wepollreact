import React, {Component} from 'react'
import './ItemPlacard.css'

class ItemPlacard extends Component{
  render(){
    const {name, stack, cost, image, onDelete} = this.props
    return(
      <div>
        <button>Buy This Item</button>
        <p>Item name is {name}</p>
        <p>Item stack is {stack}</p>
        <p>Item cost is {cost}</p>
        <img className='item-image' src={image} />
        <span onClick={onDelete}> X </span>
      </div>
    )
  }
}

export default ItemPlacard