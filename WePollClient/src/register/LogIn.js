import React, {Component} from 'react'
import './LogIn.css'

class LogIn extends Component{
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
      .onAuth("signin", this.state)
      .then(() => {
        this.props.history.push("/");
      })
      // .catch(() => {
      //   return;
      // });
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
        <h1>Log In!</h1>
        {errors.message && (<div className="errorMessage">{errors.message}</div>)}
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          id="username"
          name="username"
          onChange={this.handleChange}
          type="text"
          value={username}
        />
        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          id="password"
          name="password"
          onChange={this.handleChange}
          type="password"
          value={password}
        />
        <button type="submit">Log In</button>
      </form>
    </div>)
  }
}

export default LogIn;