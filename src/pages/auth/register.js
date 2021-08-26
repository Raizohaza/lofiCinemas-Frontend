import React, {  useState } from 'react';
import { Link } from "react-router-dom";
import './login.css'
import api from 'api';
import { useSelector } from 'react-redux';

export default function Register()
{
    const [Email,setEmail]= useState('');
    const [Tel,setTel]= useState('');
    const [Name,setName]= useState('');
    const [Password,setPassword]= useState('');
    const [ConfirmPassword,setConfirmPassword]= useState('');
    let User = useSelector(state=>state.user.User);
    let handleSubmit = e =>{
        
        e.preventDefault();
        const User ={
            Email:Email,
            Tel:Tel,
            Name:Name,
            Password:Password,
            ConfirmPassword:ConfirmPassword,
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
   
       return(
            <form className="login" onSubmit={handleSubmit}>
               <p className="title">Register</p>
                <div className="field-input">
                    <p>Email</p>
<<<<<<< HEAD
                    <input onChange={e =>this.Email=e.target.value}  className="input" type="email" required />
                    <p>Name</p>
                    <input onChange={e =>this.Name=e.target.value}  className="input" type="text" required />
                    <p>Tel</p>
                    <input onChange={e =>this.Tel=e.target.value}  className="input" type="text" required />
                    <p>Password</p>
                    <input onChange={e =>this.Password=e.target.value} className="input" type="password" required />
                    <p>Confirm Password</p>
                    <input onChange={e =>this.ConfirmPassword=e.target.value} className="input" type="password" required />
=======
                    <input onChange={e =>setEmail(e.target.value)}  className="input" type="email"  />
                    <p>Name</p>
                    <input onChange={e =>setName(e.target.value)}  className="input" type="text"  />
                    <p>Tel</p>
                    <input onChange={e =>setTel(e.target.value)}  className="input" type="text"  />
                    <p>Password</p>
                    <input onChange={e =>setPassword(e.target.value)} className="input" type="password" />
                    <p>Confirm Password</p>
                    <input onChange={e =>setConfirmPassword(e.target.value)} className="input" type="password" />
>>>>>>> bdddb92af50cee1f661b57ab4445dc907e32e94f
                </div>
               
                <button type='submit' className="btn-register" onClick={()=>{
                 User?alert("Account create complete"):alert("check you email to complete")
                }}>
                    <p className="text-in-button">Register</p>
                </button>
               <Link to='/login'>
                    <p className="stroke-font">Have Account?</p>
               </Link>
            </form>
       );
   }

