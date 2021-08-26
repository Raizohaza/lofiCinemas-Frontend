import React, {  useState } from 'react';
import { Link } from "react-router-dom";
import './login.css'
import api from 'api';
import { useSelector } from 'react-redux';
import AlertBT from 'components/alerts';
export default function Register()
{
    const [Email,setEmail]= useState('');
    const [Tel,setTel]= useState('');
    const [Name,setName]= useState('');
    const [Password,setPassword]= useState('');
    const [ConfirmPassword,setConfirmPassword]= useState('');
    const [alertInfo,setAlertInfo] = useState({});
    let curUser = useSelector(state=>state.user.User);
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
                console.log(res.data)
                setAlertInfo({ 
                    notification:res.data,
                    show:true,
                });
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    };
    return(
        <>
            <AlertBT data={alertInfo}>

            </AlertBT>
            <form className="login" onSubmit={handleSubmit}>
                <p className="title-auth">Register</p>
                <div className="field-input">
                    <p>Email</p>
                    <input onChange={e =>setEmail(e.target.value)}  className="input" type="email" required/>
                    <p>Name</p>
                    <input onChange={e =>setName(e.target.value)}  className="input" type="text" required/>
                    <p>Tel</p>
                    <input onChange={e =>setTel(e.target.value)}  className="input" type="text" required/>
                    <p>Password</p>
                    <input onChange={e =>setPassword(e.target.value)} className="input" type="password" required/>
                    <p>Confirm Password</p>
                    <input onChange={e =>setConfirmPassword(e.target.value)} className="input" type="password" required/>
                </div>
                
                <button type='submit' className="btn-register">
                    <p className="text-in-button">Register</p>
                </button>
                <Link to='/login'>
                    <p className="stroke-font">Have Account?</p>
                </Link>
            </form>
        </>
    );
   }

