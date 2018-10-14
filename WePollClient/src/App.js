import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import './App.css'
import Landing from './landing/Landing'
import NavBar from "./hocs/NavBar";
import Party from "./party/Party";
import Profile from "./profile/Profile";
import Question from "./question/Question";
import Settings from "./settings/Settings";
import Shop from "./shop/Shop";
import Splash from "./splash/Splash";
import Register from "./register/Register";
import LogIn from "./register/LogIn";
import Footer from "./hocs/Footer";

const App = () => {
  return(
      <div className='App'>
        <NavBar/>
        <Switch>
          <Route path='/landing' component={Landing}/>
          <Route path='/about' component={() => window.location = 'https://www.dinnostudio.com/wepoll-deck'}/>
          <Route path='/party' component={Party}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/question' component={Question}/>
          <Route path='/settings' component={Settings}/>
          <Route path='/shop' component={Shop}/>
          <Route path='/shop' component={Shop}/>
          <Route path='/splash' component={Splash}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/logIn' component={LogIn} />
          <Redirect from="/" to="/landing"/>
        </Switch>
        <Footer/>
      </div>
  )
}

export default App;

