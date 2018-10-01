import React, {Component} from 'react'
import './LogIn.css'

class LogIn extends Component{
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      inputValue:e.target.value
    });
  }


  render(){
    return(<div>
      <h1>Log In!</h1>
      <form action="/api/login" method="POST">
        <input type="text"
         name="username"
         value={this.state.username}
         onChange = {this.handleChange}/>
        <input type="text"
         name="password"
         value={this.state.password}
         onChange = {this.handleChange}/>
        <button onClick = {this.handleSubmit}>Log In</button>
      </form>
    </div>)
  }
}

export default LogIn;