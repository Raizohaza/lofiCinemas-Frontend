import {  useState } from "react";
import {   useSelector } from "react-redux";
import './profile.css'
import api from "api";
import AlertBT from 'components/alerts';

export default function Profile (){

    const [Email,setEmail]= useState('');
    const [Tel,setTel]= useState('');
    const [Name,setName]= useState('');
    const [oldPassword,setOldPassword]= useState('');
    const [newPassword,setNewPassword]= useState('');
    const [confirmPassword,setConfirmPassword] = useState({});
    const [alertInfo,setAlertInfo] = useState({});
    let User = useSelector(state=>state.user.User);
    let  handleSubmit = e =>{
        e.preventDefault();
        const data ={
            Email:Email,
            Tel:Tel,
            Name:Name,
            oldPassword:oldPassword,
            newPassword:newPassword,
            confirmPassword:confirmPassword
        };
        api.post('/user/'+User.id+'/profile',data).then(
            res=>{
                console.log(res)
                setAlertInfo({ 
                    notification:res.data,
                    show:true,
                });
         }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    };
 
      return(
        <>
        <AlertBT data={alertInfo}>
        </AlertBT>
          <form className='profile' onSubmit={handleSubmit}>
              <h3>Change profile</h3>        
              <div className='info-user'>
                <div className="form-group">
                    <label>New name:</label>
                    <input type="text" value={User.Name} onChange={e =>setName(e.target.value)} className="form-control" placeholder="Name" />
                </div>
                <div className="form-group">
                    <label>Tel</label>
                    <input type="text" value={User.Tel} onChange={e =>setTel(e.target.value)} className="form-control" placeholder="Tel" />
                </div>
                <div className="form-group">
                    <label>Old Password</label>
                    <input type="password" onChange={e =>setOldPassword(e.target.value)} className="form-control" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" onChange={e =>setNewPassword(e.target.value)} className="form-control" placeholder="New password" />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" onChange={e =>setConfirmPassword(e.target.value)} className="form-control" placeholder="Confirm Password" />
                </div>
              </div>
             
              <button className='btn-submit'>
                Ok</button>
          </form>
          </>
      )
  }
