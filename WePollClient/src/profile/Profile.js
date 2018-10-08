import React, {Component} from 'react'
import './Profile.css'
import withAuth from '../hocs/withAuth'
import connect from 'react-redux/es/connect/connect'

class Profile extends Component{
  render(){
    const user = this.props.currentUser.user
    if(user.experience) {
      return (<div>{user.username} has {user.experience} experience</div>)
    } else if(user){
      return(<div>{user.username}'s Profile! If your information is not displaying properly, please log out and log back in</div>)
    } else {
      return(<div>Please log in to see your profile</div>)
    }
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(withAuth(Profile));