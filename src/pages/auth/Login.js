import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { 
    faFacebook, 
    faGoogle, 
    faGithub } from '@fortawesome/free-brands-svg-icons'
import FacebookLogin from 'react-facebook-login';

import './login.css'
import logo from '../../assets/img/login.jpg'
import { userLogin } from "features/user/userSlice";
import api from "api";
import GoogleLogin from "react-google-login";

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    responseFacebook(res) {
        localStorage.setItem('UID',res.id);
        localStorage.setItem('Email',res.email);
        localStorage.setItem('Name',res.name);
        localStorage.setItem('Role',res.Role);
        localStorage.setItem('fbId',res.userID);
        console.log(res);
        api.post('/user/auth/loginFacebook',{Email:res.email,Name:res.name,Role:res.role,facebookId:res.userID,Verify:true})
    }
    responseGoogle = (res) => {
        localStorage.setItem('UID',res.ct.KS);
        localStorage.setItem('Role',res.Role);
        localStorage.setItem('Email',res.ct.Mt);
        localStorage.setItem('Name',res.ct.Ue);
        localStorage.setItem('ggId',res.googleId);
        api.post('/user/auth/loginGoogle',{Email:res.ct.Mt,Name:res.ct.Ue,Role:res.role,googleId:res.googleId,Verify:true})
      }
    handleSubmit = e =>{
        e.preventDefault();
        const User ={
            Email:this.Email,
            Password:this.Password,
            Role:this.Role
        };
        api.post('/user/login',{...User})
        .then( res=> {
            
            if(res)
               {
               localStorage.setItem('UID',res.data.user.id);
               localStorage.setItem('Email',res.data.user.Email);
               localStorage.setItem('Name',res.data.user.Name);
               localStorage.setItem('Tel',res.data.user.Tel);
               localStorage.setItem('Role',res.data.user.Role);
               this.setState({
                   loggedin:true,
                   Role: res.data.user.Role,
               });
               this.setState(res.data.user);
               console.log(this.state);
            }
            else
                console.log('error')
          })
        // this.props.dispatch(userLogin(User))
        // console.log(this.state)
    };

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
                        <FacebookLogin
                            appId="835649640710124"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            icon={<FontAwesomeIcon icon={faFacebook}/>}
                            onClick={()=>{<Link to={`/`}/>}}
                        />
                        <GoogleLogin
                            clientId="552583281067-aeqqgkbg4kdutpdfh5venrvanplmhaev.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            icon={true}
                        />
                </div>
                <div>{this.state.user}</div>
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
// const mapStateToProps = (state) => ({
//     User: state.user.User
// });
// export default connect(mapStateToProps)(login);
export default login