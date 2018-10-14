import React, {Component} from 'react'
import './ItemPlacard.css'
import connect from 'react-redux/es/connect/connect'

class ItemPlacard extends Component{
  render(){
    const {name, stack, cost, image, removeItem, addToInventory} = this.props
    return(
      <div>
        <p>Item name is {name}</p>
        <p>Item stack is {stack}</p>
        <p>Item cost is {cost}</p>
        <img className='item-image' src={image} />
        <button onClick={addToInventory}>Buy This Item</button>
        <span onClick={removeItem}> X </span>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    errors: state.errors
  }
}

export default connect(mapStateToProps)(ItemPlacard);