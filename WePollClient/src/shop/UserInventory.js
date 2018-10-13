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



  render(){
    const { user } = this.props.currentUser
    return(
      <div>
        {user.username} 's Inventory
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

        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, {buyCoins})(UserInventory);