import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
export default class resetpass extends Component{
    state ={};
    handleSubmit=e=>{
        e.preventDefault();
        const data={
            token:this.props.match.params.id,
            password:this.password,
            password_confirm:this.password_confirm
        };
        axios.post('reset',data).then(
            res=>{
                console.log(res);
                this.setState({
                    resetpass:true
                })
            }
        ).catch(
            err=>{
                console.log(err);
            }
        )
    };
    render(){
        if(this.state.resetpass)
        {
            return <Redirect to={'/login'}/>
        }
        return(
            <form onSubmit={this.handleSubmit}>
            <h3>Login</h3>

            <div className="form-group">
                <label>Password</label>
                <input type="password" onChange={e =>this.password=e.target.value} className="form-control" placeholder="Password" />
            </div>

            <div className="form-group">
                <label>Password confirm</label>
                <input type="password" onChange={e =>this.password_confirm=e.target.value} className="form-control" placeholder="Password confirm" />
            </div>
            <button>Submit</button>
          
        </form>
        )
    }
}
