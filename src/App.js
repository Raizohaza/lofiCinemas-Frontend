import './App.css';
import React, { Component } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import Nav from './components/Nav';
import axios from 'axios';
import forgotpass from './components/forgotpass';
import Profile from './components/Profile';
import resetpass from './components/resetpass';


export default class App extends Component{
  state = {};
  componentDidMount =() =>{
        
    axios.get('login').then(
        res=>{
            this.setUser(res.User)
        },
        err =>{
            console.log(err)
        }
    )};
  setUser = user =>{
    this.setState({
      user: user
  });
  }

  render(){
     return(
    <BrowserRouter>
      <div className="App">
        <Nav user= {this.state.user} setUser={this.setUser}/>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
             <Route exact path="/" component={()=><Home user={this.state.user}/>}/>
             <Route exact path="/Login" component={()=><Login setUser={this.setUser}/>}/>
             <Route exact path="/Register" component={Register }/>
             <Route exact path="/forgot" component={forgotpass}/>
             <Route exact path="/profile" component={Profile}/>
             <Route exact path="/reset/:id" component={resetpass}/>
               </Switch>
        
      </div>
    </div>
    </div> 
    </BrowserRouter>
   
   
  )
}
}
