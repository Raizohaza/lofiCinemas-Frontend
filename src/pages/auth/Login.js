import React, {  useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from "react-router";
import {  useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { 
    faFacebook,
    // faGoogle
    } from '@fortawesome/free-brands-svg-icons'
import FacebookLogin from 'react-facebook-login';
import './login.css'
import logo from '../../assets/img/login.jpg'
import { userLogin, userLoginFacebook, userLoginGoogle } from "features/user/userSlice";

import GoogleLogin from "react-google-login";

export default function Login() {
    const dispatch = useDispatch();
    const [Email,setEmail]= useState('');
    const [Password,setPassword]= useState('');
    let loggedIn =  useSelector(state=>state.user.loggedIn);
    let Role = useSelector(state=>state.user.role);
   
    function responseFacebook(res) {
        dispatch(userLoginFacebook({Email:res.email,Name:res.name,Role:'user',facebookId:res.userID,Verify:true}));
    }
    let responseGoogle = (res) => {
        dispatch(userLoginGoogle({Email:res.ct.Mt,Name:res.ct.Ue,Role:'user',googleId:res.googleId,Verify:true}));
    }
    let handleSubmit = e =>{
        e.preventDefault();
        const User ={
            Email:Email,
            Password:Password,
            Role:'user'
        };
        dispatch(userLogin(User));
    };

    if(loggedIn&&Role!=="admin"){
        return <Redirect to={'/'}/>;
    }
    else if(loggedIn&&Role==="admin")
    {
        return <Redirect  to={`/admin/dashboard`}/>;
    }
    else
        return(
            <form className="login" onSubmit={handleSubmit}>
                <img className="logo-login" src={logo} alt=""></img>
                <div className="field-input">
                    <p className="texture">Email:</p>
                    <input  onChange={e =>setEmail(e.target.value)}  className="input" type="email"  />
                    <p className="texture">Password:</p>
                    <input  onChange={e =>setPassword(e.target.value)} className="input" type="password" />
                </div>
                <p> OR </p>
                <div className="login-with">
                        <FacebookLogin
                            appId="835649640710124"
                            fields="name,email,picture"
                            callback={responseFacebook}
                            size="small"
                            textButton=""
                            icon={<FontAwesomeIcon icon={faFacebook} />}
                            onClick={()=>{<Link to={`/`}/>}}
                        />
                        <GoogleLogin
                            clientId="552583281067-aeqqgkbg4kdutpdfh5venrvanplmhaev.apps.googleusercontent.com"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            buttonText=""
                            icon={true}
                            
                        />
                        
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

