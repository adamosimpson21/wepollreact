import React, {Component} from 'react'
import './Footer.css'
import connect from 'react-redux/es/connect/connect'
import {levelProgress} from '../helper/experience'

class Footer extends Component{
   render(){
    if( this.props.currentUser && this.props.currentUser.isAuthenticated){
      return(<div className='footer'>
              <div className='footerContent'>
                <div className='progressBarContainer'>
                  <div className="progress-bar xpProgressBar" role="progressbar"
                       aria-valuenow={this.props.currentUser.user.experience}
                       // aria-valuemin="0" aria-valuemax="100" style={{width: levelProgress(this.props.currentUser.user.experience)}}>
                       aria-valuemin="0" aria-valuemax="100" style={{width: levelProgress(450)+'%'}}>
                  </div>
                </div>
                You have {this.props.currentUser.user.experience} experience!
                </div>
              </div>)
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