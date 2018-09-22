import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import './App.css'
import Landing from './landing/Landing'
import ErrorBoundary from './hocs/ErrorBoundary'
import NavBar from "./hocs/NavBar";
import About from "./about/About";
import Party from "./party/Party";
import Profile from "./profile/Profile";
import Question from "./question/Question";
import Settings from "./settings/Settings";
import Shop from "./shop/Shop";
import Splash from "./splash/Splash";
import Register from "./register/Register";
import LogIn from "./register/LogIn";
import Footer from "./hocs/Footer";

const App = () => (
  <ErrorBoundary>
    <Router>
      <div className='App'>
        <NavBar />
        <Switch>
          <Route path='/landing' component={Landing} />
          <Route path='/about' component={() => window.location = 'https://www.dinnostudio.com/wepoll-deck'} />
          <Route path='/party' component={Party} />
          <Route path='/profile' component={Profile} />
          <Route path='/question' component={Question} />
          <Route path='/settings' component={Settings} />
          <Route path='/shop' component={Shop} />
          <Route path='/splash' component={Splash} />
          <Route path='/register' component={Register} />
          <Route path='/logIn' component={LogIn} />
          <Redirect from="/" to="/landing" />
        </Switch>
        <Footer />
      </div>
    </Router>
  </ErrorBoundary>
)

export default App

