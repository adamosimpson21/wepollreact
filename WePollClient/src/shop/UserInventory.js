import React, {Component} from 'react';
import './UserInventory.css';
import connect from 'react-redux/es/connect/connect'
import {buyCoins} from '../store/actions/user'

class UserInventory extends Component{
  constructor (props) {
    super(props)
    this.state = this.defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.populateItem = this.populateItem.bind(this)
  }

  defaultState = {
    coinsToBuy : 5
  }

  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.buyCoins(this.state.coinsToBuy)
      // .then( updatedUser => {})
    this.setState(this.defaultState)
  }

  populateItem(itemId){
    let itemMatch = {}
    this.props.items.forEach(item => {
      if(item._id===itemId){
        itemMatch = {...item}
      }
    })
    return itemMatch;
  }

  render(){
    const { user} = this.props.currentUser
    const items = this.props.items
    if(Object.keys(user).length > 0){
      let userItems = (<div>Loading Items</div>)
      if(items.length >0){
        userItems = user.inventory.map(item => {
          let itemWithDetails = this.populateItem(item)
          return (<div className='item-in-inventory'>This is an item {itemWithDetails.name} </div>)
        })
      }
      return(
        <div>
          {user.username}'s Inventory
          You have {user.coins} coins
          <form onSubmit={this.handleSubmit}>
            <label>Buy Coins:
              <input
                type='number'
                name='coinsToBuy'
                aria-label='Number of Coins to Buy'
                value={this.state.coinsToBuy}
                onChange = {this.handleChange}
                required
              />
            </label>
            <button type="submit">Add Coins</button>
          </form>
          <div>
            <div className='inventory-items'>
              {userItems}
            </div>
          </div>
        </div>
    )} else {
      return(<div>Loading User...</div>)
    }
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    items: state.items
  };
}

export default connect(mapStateToProps, {buyCoins})(UserInventory);