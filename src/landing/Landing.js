import React, {Component} from 'react'
import './Landing.css'
import ButtonLG from '../hocs/ButtonLG'
import Link from "react-router-dom/es/Link";

class Landing extends Component{
  render(){
    return(
      <div>
        <div className='landingTitle'>
        <h1>Welcome to WePoll!</h1>
        <div className='landingDescription'>WePoll is a free to use app that helps people Represent Themselves! Answer political, social, and economic
          polls to improve debate and Democracy!</div>
        </div>
        <div className='landingButtons'>
          <Link to='/question'><ButtonLG label='Questions'></ButtonLG></Link>
          <Link to='/party'><ButtonLG label='Party'></ButtonLG></Link>
          <Link to='/shop'><ButtonLG label='Shop'></ButtonLG></Link>
          <Link to='/settings'><ButtonLG label='Settings'></ButtonLG></Link>
          <Link to='/about'><ButtonLG label='About'></ButtonLG></Link>
        </div>
      </div>)
  }
}

export default Landing;