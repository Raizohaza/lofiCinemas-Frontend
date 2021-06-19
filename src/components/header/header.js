import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHeart, faMap, faUser, faCog} from '@fortawesome/free-solid-svg-icons'
import './header.css'
import LoliCinemas from '../img/loli-cinemas.svg'
import axios from 'axios';
import {Link} from "react-router-dom";

class header extends Component{
    
    render(){
        const ten= localStorage.getItem('token');
        return(
            
            <div className="header">
                
                <div className="logo">
                    <img src={LoliCinemas}></img>
                </div>
                <div className="tool">
                    <i>
                    <Link to={'/'}  className="nav-link">  <FontAwesomeIcon icon={faHome}/></Link>
                      
                    </i>
                    <i>
                        <FontAwesomeIcon icon={faHeart}/>
                    </i>
                    <i>
                        <FontAwesomeIcon icon={faMap}/>
                    </i>
                </div>
                <div className="avatar">
                    <i>
                    <Link to={'/Dangnhap'} className="nav-link"> <FontAwesomeIcon icon={faUser}/> </Link>
                       
                    </i>
               {ten}
                    <i>
                    <Link to={'/Profile'} className="nav-link"><FontAwesomeIcon icon={faCog}/></Link>
                        
                    </i>
                </div>
                
            </div>
                
   
        );
    }
}
export default header;