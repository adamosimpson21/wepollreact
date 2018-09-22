import React, {Component} from 'react'
import './Footer.css'

class Footer extends Component{
  constructor(props){
    super(props)
    this.state={
      isLoggedIn:false
    }
  }

  render(){
    if(this.state.isLoggedIn){
      return(<div className='footer'>You're level 5? With lots of experience!</div>)
    } else {
      return(<div className='footer'>Create an new Username/password to access experience and leveling!</div>)
    }
  }
}

export default Footer;