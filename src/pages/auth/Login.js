import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { 
    faFacebook,
    } from '@fortawesome/free-brands-svg-icons'
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
    componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.User !== prevProps.User) {
        localStorage.setItem('UID',this.props.User.id);
        localStorage.setItem('Email',this.props.User.Email);
        localStorage.setItem('Name',this.props.User.Name);
        localStorage.setItem('Tel',this.props.User.Tel);
        localStorage.setItem('Role',this.props.User.Role);
        this.setState({
            loggedIn:this.props.loggedIn,
            Role: this.props.role,
        });
        this.setState(this.props.User);
        console.log(this.props.User);
        
    }
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
        this.props.dispatch(userLogin(User));
        console.log(this.props);
        // this.setState({
        //     loggedIn:this.props.loggedIn,
        //     Role: this.props.role,
        // });
        // this.setState(this.props.User);
    };

    render(){
        if(this.state.loggedIn&&this.state.Role!=="admin"){
            return <Redirect to={'/'}/>;
        }
        else if(this.state.loggedIn&&this.state.Role==="admin")
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
const mapStateToProps = (state) => ({
    User: {...state.user.User},
    loggedIn: state.user.loggedIn,
    role: state.user.role
});
export default connect(mapStateToProps)(login);