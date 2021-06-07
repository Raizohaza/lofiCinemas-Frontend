import React, { Component } from 'react';
import axios from 'axios';
export default class forgotpass extends Component{


    handleSubmit = e =>{
        e.preventDefault();
        alert("Your new pass in your email")
        const data = {
            Email:this.email
        };
        axios.post('reset',data).then(
            res=>{
                console.log(res)
            }
        ).catch(
            err =>{
                console.log(err);
            }
        )
    };
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
            <h3>ForgotPassword</h3>

            <div className="form-group">
                <label>Email</label>
                <input type="email" onChange={e =>this.email=e.target.value} className="form-control" placeholder="email" />
            </div>
            <button>Submit</button>
        </form>
        )
    }
}