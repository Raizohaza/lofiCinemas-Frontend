import { Component } from "react";
import axios from 'axios';


import './profile.css'

export default class Profile extends Component{
    handleSubmit = e =>{
        e.preventDefault();
        const User ={
            Email:this.Email,
            Name:this.Name,
            oldPassword:this.oldPassword,
            newPassword:this.newPassword,
            confirmPassword:this.confirmPassword
        };
        axios.post('/'+localStorage.getItem('token2')+'/profile',User).then(
            res=>{
                console.log(res)
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    };
  render(){
      return(
          <form className='profile' onSubmit={this.handleSubmit}>
              <h3>Change profile</h3>
              <img className='avatar'></img>
              
              <div className='info-user'>
                <div className="form-group">
                    <label>New name:</label>
                    <input type="text" onChange={e =>this.Name=e.target.value} className="form-control" placeholder="Name" />
                </div>
                <div className="form-group">
                    <label>Old Password</label>
                    <input type="password" onChange={e =>this.oldPassword=e.target.value} className="form-control" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" onChange={e =>this.newPassword=e.target.value} className="form-control" placeholder="New password" />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" onChange={e =>this.confirmPassword=e.target.value} className="form-control" placeholder="Confirm Password" />
                </div>
              </div>
             
              <button className='btn-submit'>Submit</button>
          </form>
      )
  }
}