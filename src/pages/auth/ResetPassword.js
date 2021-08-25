import React, { useState } from 'react';
import './login.css';
import api from 'api';

export default function RsPassword(){
   
    const [email,setemail]= useState('');
    let handleSubmit = e =>{
        e.preventDefault();
        alert("Your new pass in your email")
        const data = {
            Email:email
        };
        api.post('/user/reset',data).then(
            res=>{
                console.log(res)
            }
        ).catch(
            err =>{
                console.log(err);
            }
        )
    };
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
                    <input onChange={e =>setemail(e.target.value)} className="input" type="text"  />
                </div>
                <button  type='submit' onClick={handleSubmit}  className="btn-request">
                    <p className="text-in-button">Send request</p>
                </button>
                
            </div>
        );
    }

