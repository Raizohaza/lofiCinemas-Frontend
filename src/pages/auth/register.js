import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './login.css'
import api from 'api';

class register extends Component 
{
    handleSubmit = e =>{
        
        e.preventDefault();
        const User ={
            Email:this.Email,
            Tel:this.Tel,
            Name:this.Name,
            Password:this.Password,
            ConfirmPassword:this.ConfirmPassword,
            Role:'user'
        };
        api.post('/user/register',{...User}).then(
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
                    <input onChange={e =>this.Email=e.target.value}  className="input" type="email" required />
                    <p>Name</p>
                    <input onChange={e =>this.Name=e.target.value}  className="input" type="text" required />
                    <p>Tel</p>
                    <input onChange={e =>this.Tel=e.target.value}  className="input" type="text" required />
                    <p>Password</p>
                    <input onChange={e =>this.Password=e.target.value} className="input" type="password" required />
                    <p>Confirm Password</p>
                    <input onChange={e =>this.ConfirmPassword=e.target.value} className="input" type="password" required />
                </div>
               
                <button type='submit' className="btn-register" onClick={()=>{
                    this.User?alert("Account create complete"):alert("check you email to complete")
                }}>
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