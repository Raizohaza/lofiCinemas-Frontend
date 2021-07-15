import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faHome,
    faHeart,
    faMap,
    faUser
} from '@fortawesome/free-solid-svg-icons'

import './header.css'
import LoliCinemas from '../../assets/img/loli-cinemas.svg'

class header extends Component{

    render(){
        return(
            <div className="header">
                <div className="logo">
                    <img src={LoliCinemas} alt=""></img>
                </div>
                <div className="tool">
                    <Link to='/'>
                        <i className="icon-color"><FontAwesomeIcon icon={faHome}/></i>
                    </Link>                   
                    <i className="icon-color"><FontAwesomeIcon icon={faHeart}/></i>
                    <i className="icon-color"><FontAwesomeIcon icon={faMap}/></i>
                </div>
                <div className="avatar">
                    <Link to='/register'>
                        <i className="icon-color"><FontAwesomeIcon icon={faUser}/></i>
                    </Link>
                </div>
            </div>
                
   
        );
    }
}
export default header;