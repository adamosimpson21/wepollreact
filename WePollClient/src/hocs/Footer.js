import React, {Component} from 'react'
import './Footer.css'
import connect from 'react-redux/es/connect/connect'

class Footer extends Component{
   render(){
    if( this.props.currentUser && this.props.currentUser.isAuthenticated){
      return(<div className='footer'>You have {this.props.currentUser.user.experience} experience!</div>)
    } else {
      return(<div className='footer'>Create an new Username/password to access experience and leveling!</div>)
    }
  }
}


function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(Footer);