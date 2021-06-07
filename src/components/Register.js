import { Component } from "react";
import axios from 'axios';
export default class Register extends Component{
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
              <h3>Sign up</h3>
               
              <div className="form-group">
                  <label>Email</label>
                  <input type="email" onChange={e =>this.Email=e.target.value} className="form-control" placeholder="Email" />
              </div>
              <div className="form-group">
                  <label>Username</label>
                  <input type="text" onChange={e =>this.Name=e.target.value} className="form-control" placeholder="Name" />
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type="password" onChange={e =>this.Password=e.target.value} className="form-control" placeholder="Password" />
              </div>
              <div className="form-group">
                  <label>ConfirmPassword</label>
                  <input type="password" onChange={e =>this.Confirmpassword=e.target.value} className="form-control" placeholder="ConirmPassword" />
              </div>
             
              <button>Sign up</button>
          </form>
      )
  }
}