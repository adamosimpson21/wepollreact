import React, {Component} from 'react'
import './Shop.css'
import ItemList from './ItemList'
import ItemForm from "./ItemForm";
import {fetchErrorHandler} from "../helper/helper";
import * as apiCalls from './api'

class Shop extends Component{
  constructor(props){
    super(props);
    this.state = {
      items: []
    }
    this.addItem = this.addItem.bind(this)
  }

  componentDidMount(){
    this.loadItems();
  }

  loadItems(){
    fetch('/api/items')
      .then(fetchErrorHandler)
      .then(items => this.setState({items}))
  }

  async addItem(item){
    let newItem = await apiCalls.addItem(item)
    this.setState({items: [...this.state.items, newItem]})
  }

  deleteItem(id){
    fetch('/api/items/' + id, {
      method: 'delete'
    })
      .then(() => {
        const items = this.state.items.filter(item => item._id !== id)
        this.setState({items:items})
      })
  }

  async incrementStack(item){
    await apiCalls.incrementStack(item)
    this.setState({items: this.state.items})
  }

  render(){
    return(<div>
      <ItemForm addItem={this.addItem}/>
      <ItemList items={this.state.items} deleteItem={this.deleteItem.bind(this)} onIncrement={this.incrementStack.bind(this)}/>
    </div>)
  }
}


export default Shop;