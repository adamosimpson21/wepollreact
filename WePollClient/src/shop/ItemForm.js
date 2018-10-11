import React, {Component} from 'react'
import './ItemForm.css'
import { postItem } from '../store/actions/items'
import connect from 'react-redux/es/connect/connect'

class ItemForm extends Component{
  constructor(props){
    super(props);
    this.state = {inputValue: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      inputValue:e.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.postItem({name:this.state.inputValue})
    this.setState({inputValue:''})
  }

  render(){
    return(<div>
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          value={this.state.inputValue}
          onChange = {this.handleChange}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>)
  }
}

 function mapStateToProps(state){
  return {
    items: state.items,
    errors: state.errors
  }
 }

export default connect(mapStateToProps, {postItem})(ItemForm);