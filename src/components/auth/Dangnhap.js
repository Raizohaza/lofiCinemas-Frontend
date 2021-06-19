import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {  faFacebook, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import logo from '../img/login.jpg'
import axios from 'axios';
import { Redirect } from "react-router";


export default class Dangnhap extends Component{
    state = {}
    handleSubmit = e =>{
        e.preventDefault();
        const User ={
            Email:this.Email,
            Password:this.Password
        };
        axios.post('login',{...User})
        .then( res=> {
               console.log(res);
               localStorage.setItem('token',res.data.user.Name);
               localStorage.setItem('token2',res.data.user.id);
               this.setState({
                   loggedin:true
               });
               
               this.props.setUser(res.data.user);
          })//.catch( err=> {
        //         this.setState({
        //             message: err.response.User.message
        //         })
        //    })
     };
   render(){
    if(this.state.loggedin){
        return <Redirect to={'/'}/>;
    }
    let error ='';
    if(this.state.message){
        error =(
            <div className="alert alert-danger" role="alert">
                {this.state.message}
            </div>
        )
    }
       return(
        <form onSubmit={this.handleSubmit}>
                {error}
            <div className="login">
                <img className="logo-login" src={logo}></img>
                <div className="field-input">
                    <div className="form-group">
                     <label>Email</label>
                     <input type="email" onChange={e =>this.Email=e.target.value} className="form-control" placeholder="Email" />
                     </div>

                     <div className="form-group">
                  <label>Password</label>
                  <input type="password" onChange={e =>this.Password=e.target.value} className="form-control" placeholder="Password" />
                     </div>
                </div>
                <p> OR </p>
                <div className="login-with">
                        <i className="icon-fb"><FontAwesomeIcon icon={faFacebook}/></i>
                        <i className="icon-gg"><FontAwesomeIcon icon={faGoogle}/></i>
                        <i className="icon-git"><FontAwesomeIcon icon={faGithub}/></i>
                </div>
                <button  type='submit' className="btn-login">
                    <p className="text-in-button">Login</p>
                </button>
            
               <p className="stroke-font">
                <Link to={'/forgot'}>forgot pass :v</Link>
            </p>
            </div>

      </form>
       );
   }



}

