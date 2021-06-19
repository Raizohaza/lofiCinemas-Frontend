import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from 'axios';
import './login.css'



export default class register extends Component{
    handleSubmit = e =>{
        
        e.preventDefault();
        const User ={
            Name:this.Name,
            Password:this.Password,
            Email:this.Email,
            ConfirmPassword:this.Confirmpassword
        };
        axios.post('register',User).then(
            res=>{
                console.log(res)
                alert("Please check your email to confirm");
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    };
   render(){
       return(
        <form onSubmit={this.handleSubmit}>
            <div className="login">
               <p className="title">Register</p>
                <div className="field-input">
                   <label>Email</label>
                   <input type="email" onChange={e =>this.Email=e.target.value} className="input" placeholder="Email" />
                   
                   <label>Username</label>
                   <input type="text" onChange={e =>this.Name=e.target.value} className="input" placeholder="Name" />
                    
                   <label>Password</label>
                    <input type="password" onChange={e =>this.Password=e.target.value}  className="input" placeholder="Password" />

                    <label>ConfirmPassword</label>
                     <input type="password" onChange={e =>this.Confirmpassword=e.target.value}className="input" placeholder="ConirmPassword" />
                </div>
               
                <button  type='submit' className="btn-register">
                    <p className="text-in-button">Register</p>
                </button>
            
               <p className="stroke-font">Have Account?</p>
            </div>         
            </form>
       );
   }
}





