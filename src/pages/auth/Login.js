import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { Redirect } from "react-router";
import { Link } from 'react-router-dom';
import { 
    faFacebook, 
    faGoogle, 
    faGithub } from '@fortawesome/free-brands-svg-icons'


import './login.css'
import logo from '../../assets/img/login.jpg'




class login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    handleSubmit = e =>{
        e.preventDefault();
        const User ={
            Email:this.Email,
            Password:this.Password,
            Role:this.Role
        };
        axios.post('https://lofi-cinemas.herokuapp.com/user/login',{...User})
        .then( res=> {
               localStorage.setItem('token',res.data.user.Email);
               localStorage.setItem('token2',res.data.user.id);
               localStorage.setItem('token3',res.data.user.Role);
               this.setState({
                   loggedin:true,
                   Role: res.data.user.Role,
               });
               this.setState(res.data.user);
               console.log(this.state);
          })
    };
    handleClick = e =>{
        e.preventDefault();
        axios.get('https://lofi-cinemas.herokuapp.com/user/auth/loginFacebook')
        .then( res=> {
            localStorage.setItem('token',res.data.Email);
            localStorage.setItem('token2',res.data.id);
            localStorage.setItem('token3',res.data.Role);
            localStorage.setItem('token3',res.data.facebookId);
            this.setState({
                loggedin:true,
                Role: res.data.Role,
            });
            this.setState(res.data.user);
            console.log(this.state);
            console.log(res);
       })
    }
    render(){
        if(this.state.loggedin&&this.state.Role!=="admin"){
            return <Redirect to={'/'}/>;
        }
        else if(this.state.loggedin&&this.state.Role==="admin")
        {
            return <Redirect  to={`/admin/dashboard`}/>;
        }
        else
        return(
            <form className="login" onSubmit={this.handleSubmit}>
                <img className="logo-login" src={logo} alt=""></img>
                <div className="field-input">
                    <p>Email:</p>
                    <input  onChange={e =>this.Email=e.target.value}  className="input" type="email"  />
                    <p>Password:</p>
                    <input  onChange={e =>this.Password=e.target.value} className="input" type="password" />
                </div>
                <p> OR </p>
                <div className="login-with">
                        <i className="icon-fb">
                            <FontAwesomeIcon icon={faFacebook} onClick={this.handleClick}/>
                        </i>
                        <i className="icon-gg"><FontAwesomeIcon icon={faGoogle}/></i>
                        <i className="icon-git"><FontAwesomeIcon icon={faGithub}/></i>
                </div>
                <button  type='submit' className="btn-login">
                    <p className="text-in-button">Login</p>
                </button>
            

                
                <Link to='/reset-password'>
                   <p className="stroke-font">Forgot password?</p>
                </Link>
            </form>
       );
   }



}

export default login;