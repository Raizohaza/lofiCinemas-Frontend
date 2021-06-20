
import React, { Component } from 'react';
import axios from 'axios';


import './login.css';

class RsPassword extends Component{
    handleSubmit = e =>{
        e.preventDefault();
        alert("Your new pass in your email")
        const data = {
            Email:this.email
        };
        axios.post('url',data).then(
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
            <div className="login">
                <p className="title">Forgot Password</p>
                <div className="note">
                    <p>Lưu ý: </p>
                    <p>Loli Cinemas sẽ không đảm bảo gửi email nếu bạn cung cấp thông tin không chính xác. 
                    Hãy kiểm tra trong hòm Spam, Thư Rác, Junk... nếu như không tìm thấy thư đến.</p>
                </div>
                <div className="field-input">
                    <p>Email:</p>
                    <input onChange={e =>this.email=e.target.value} className="input" type="text"  />
                </div>
                <button  type='submit' className="btn-request">
                    <p className="text-in-button">Send request</p>
                </button>
                <button  type='submit' className="btn-cancel">
                    <p className="text-in-button">Cancel</p>
                </button>
                
            </div>
        );
    }
}
export default RsPassword;