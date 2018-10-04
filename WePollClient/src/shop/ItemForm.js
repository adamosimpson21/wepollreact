import React, {Component} from 'react'
import './ItemForm.css'
import { connect } from 'react-redux'

class ItemForm extends Component{
  constructor(props){
    super(props);
    this.state = {inputValue: 'item here'}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      inputValue:e.target.value
    });
  }

  handleSubmit(){
    // this.props.dispatch({
    //   type: "ADD_ITEM",
    //   task: this.state.task
    // })
    this.props.addItem(this.state.inputValue)
  }

  render(){
    return(<div>
      <input
        type='text'
        value={this.state.inputValue}
        onChange = {this.handleChange}
      />
      <button
        onClick = {this.handleSubmit}
      >Add Item</button>
    </div>)
  }
}

export default ItemForm;