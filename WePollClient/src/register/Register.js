import React, {Component} from 'react'
import './Register.css'

class Register extends Component{
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .onAuth("signup", this.state)
      .then(() => {
        this.props.history.push("/");
      })
  }

  render(){
    const { username, password } = this.state;
    const {
      errors,
      history,
      removeError
    } = this.props;

    history.listen(() => {
      removeError();
    });

    return(<div>
      <form onSubmit = {this.handleSubmit}>
        <h1>Register Here</h1>
        {errors.message && (<div className="errorMessage">{errors.message}</div>)}
        <label>Username
          <input
            autoComplete="off"
            id="username"
            name="username"
            onChange={this.handleChange}
            type="text"
            value={username}
          />
        </label>
        <label>Password
          <input
            autoComplete="off"
            id="password"
            name="password"
            onChange={this.handleChange}
            type="password"
            value={password}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>)
  }
}

export default Register;