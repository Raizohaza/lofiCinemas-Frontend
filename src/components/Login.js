import { Component } from "react";
import axios from 'axios';
import { Redirect } from "react-router";
import { Link } from "react-router-dom";


 
export default class Login extends Component{
    state = {}
    handleSubmit = e =>{
        e.preventDefault();
        const User ={
            Email:this.Email,
            Password:this.Password
        };
        axios.post('login',{...User})
        .then( res=> {
               console.log(res.User);
               localStorage.setItem('token',res);
               this.setState({
                   loggedin:true
               });
               this.props.setUser(res.data.user);
          })//.catch( err=> {
        //         this.setState({
        //             message: err.response.User.message
        //         })
        //    })
     };
    render(){
        if(this.state.loggedin){
            return <Redirect to={'/'}/>;
        }
        let error ='';
        if(this.state.message){
            error =(
                <div className="alert alert-danger" role="alert">
                    {this.state.message}
                </div>
            )
        }
        return(
            <form onSubmit={this.handleSubmit}>
                {error}
            <h3>Login</h3>

            <div className="form-group">
                  <label>Email</label>
                  <input type="email" onChange={e =>this.Email=e.target.value} className="form-control" placeholder="Email" />
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type="password" onChange={e =>this.Password=e.target.value} className="form-control" placeholder="Password" />
              </div>
            <button>Login</button>
            <p>
                <Link to={'/forgot'}>forgot pass :v</Link>
            </p>
        </form>
        )
    }
}
