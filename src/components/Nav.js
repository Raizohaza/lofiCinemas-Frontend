import { Component } from "react";
import {Link} from "react-router-dom";
export default class Nav extends Component{
    handleLogout = () => {
        localStorage.clear();
        this.props.setUser(null);
    }
    render(){
        let buttons;
        if(this.props.user){
            buttons = ( 
                <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link to={'/'} onClick= {this.handleLogout} className="nav-link">Logout</Link>
                      </li>
                      <li className="nav-item"> 
                          <Link to={'/Profile'} className="nav-link">ChangeProfiler</Link>
                       </li>
                    </ul>
                    ) 
        }else{
            buttons = ( 
            <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={'/Login'} className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item"> 
                  <Link to={'/Register'} className="nav-link">Register</Link>
                   </li>
                  
                </ul>
                ) 
        }
        return(
            <nav className="navbar">
            <div className="container">
              <Link to={'/'} className="navbar-brand">Home</Link>
              <div className="collapse navbar-collaspe">
                {buttons}
              </div>
            </div>
          </nav>
       
        )
    }
}