import React, {Component} from 'react'
import './ItemPlacard.css'

class ItemPlacard extends Component{
  render(){
    const {name, stack, cost, onDelete} = this.props
    return(
      <div>
        <p>Item name is {name}</p>
        <p>Item stack is {stack}</p>
        <p>Item cost is {cost}</p>
        <span onClick={onDelete}> X </span>
      </div>
    )
  }
}

export default ItemPlacard