import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { 
    faFacebook,
    faGoogle
    } from '@fortawesome/free-brands-svg-icons'
import FacebookLogin from 'react-facebook-login';

import './login.css'
import logo from '../../assets/img/login.jpg'
import { userLogin, userLoginFacebook, userLoginGoogle } from "features/user/userSlice";

import GoogleLogin from "react-google-login";

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
        if (this.props.User !== prevProps.User) {
            
            this.setState({
                loggedIn:this.props.loggedIn,
                Role: this.props.role,
            });
            this.setState(this.props.User);
            // console.log(this.props.User);
        }
    }
    responseFacebook(res) {
        this.props.dispatch(userLoginFacebook({Email:res.email,Name:res.name,Role:'user',facebookId:res.userID,Verify:true}));
    }
    responseGoogle = (res) => {
        this.props.dispatch(userLoginGoogle({Email:res.ct.Mt,Name:res.ct.Ue,Role:'user',googleId:res.googleId,Verify:true}));
      }
    handleSubmit = e =>{
        e.preventDefault();
        const User ={
            Email:this.Email,
            Password:this.Password,
            Role:'user'
        };
        this.props.dispatch(userLogin(User));
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
                    <p className="texture">Email:</p>
                    <input  onChange={e =>this.Email=e.target.value}  className="input" type="email"  />
                    <p className="texture">Password:</p>
                    <input  onChange={e =>this.Password=e.target.value} className="input" type="password" />
                </div>
                <p> OR </p>
                <div className="login-with">
                        <FacebookLogin
                            appId="835649640710124"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            size="small"
                            textButton=""
                            icon={<FontAwesomeIcon icon={faFacebook} />}
                            onClick={()=>{<Link to={`/`}/>}}
                        />
                        <GoogleLogin
                            clientId="552583281067-aeqqgkbg4kdutpdfh5venrvanplmhaev.apps.googleusercontent.com"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
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
}
const mapStateToProps = (state) => ({
    User: {...state.user.User},
    loggedIn: state.user.loggedIn,
    role: state.user.role
});
export default connect(mapStateToProps)(login);