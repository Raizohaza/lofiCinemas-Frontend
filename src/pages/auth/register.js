import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './login.css'

class register extends Component 
{
    handleSubmit = e =>{
        
        e.preventDefault();
        const User ={
            Email:this.Email,
            Name:this.Name,
            Password:this.Password,
            ConfirmPassword:this.ConfirmPassword
        };
        axios.post('https://lofi-cinemas.herokuapp.com/user/register',{...User}).then(
            res=>{
                console.log(res)
                
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    };

    render()
    {
       return(
            <form className="login" onSubmit={this.handleSubmit}>
               <p className="title">Register</p>
                <div className="field-input">
                    <p>Email</p>
                    <input onChange={e =>this.Email=e.target.value}  className="input" type="email"  />
                    <p>Name</p>
                    <input onChange={e =>this.Name=e.target.value}  className="input" type="text"  />
                    <p>Password</p>
                    <input onChange={e =>this.Password=e.target.value} className="input" type="password" />
                    <p>Confirm Password</p>
                    <input onChange={e =>this.ConfirmPassword=e.target.value} className="input" type="password" />
                </div>
               
                <button type='submit' className="btn-register">
                    <p className="text-in-button">Register</p>
                </button>
               <Link to='/login'>
                    <p className="stroke-font">Have Account?</p>
               </Link>
            </form>
       );
   }



}

export default register;