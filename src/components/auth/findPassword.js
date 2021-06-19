import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import React, { Component } from 'react';
import axios from 'axios';

import './login.css';

export default class findPassword extends Component{
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
            <div className="login">
                <p className="title">Forgot Password</p>
                <div className="note">
                    <p>Lưu ý: </p>
                    <p>Loli Cinemas sẽ không đảm bảo gửi email nếu bạn cung cấp thông tin không chính xác. 
                    Hãy kiểm tra trong hòm Spam, Thư Rác, Junk... nếu như không tìm thấy thư đến.</p>
                </div>

                <div className="field-input">
                  <label>Email</label>
                  <input type="email" onChange={e =>this.email=e.target.value}  className="input" placeholder="email" />
                </div>

                <button  type='submit' className="btn-request">
                    <p className="text-in-button">Send request</p>
                </button>
                
            </div>
            </form>
            
            
        
        );
    }
}
