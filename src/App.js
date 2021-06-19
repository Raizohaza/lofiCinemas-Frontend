import React , {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHome
} from '@fortawesome/free-solid-svg-icons'
import './App.css';
import Home from './components/Home';
import {BrowserRouter,Switch} from "react-router-dom"
import Nav from './components/Nav';
import axios from 'axios';
import Profile from './components/Profile';
//import resetpass from './components/resetpass';
import Dangnhap from './components/auth/Dangnhap';
import Detail from './components/Detail';
import register from './components/auth/register';
import findPassword from './components/auth/findPassword';
import header from './components/header/header';
import Homepage from "./Homepage";


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
    <Route path="/" component = {header}></Route>
      <div className="App">
        <Nav user= {this.state.user} setUser={this.setUser}/>
          <div className="auth-wrapper">
          
              <Switch>
             <Route exact path="/" component={()=><Home user={this.state.user}/>}/>
             <Route exact path="/dangnhap" component={()=><Dangnhap setName={this.setName} setUser={this.setUser}/>}/>
             <Route exact path="/register" component={register }/>
             <Route exact path="/forgot" component={findPassword}/>
             <Route exact path="/profile" component={Profile}/>
             <Route exact path="/detail" component={Detail}/>
             <Route exact path="/homepage" component={Homepage}/>
            
               </Switch>
                </div>
    </div> 
    </BrowserRouter>
   //<Route exact path="/reset/:id" component={resetpass}/>
   
  )
}
}

