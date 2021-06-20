import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { 
    faHome,
    faHeart,
    faMap,
    faUser,
    faCog
} from '@fortawesome/free-solid-svg-icons'

import './header.css'
import LoliCinemas from '../../assets/img/loli-cinemas.svg'

class header extends Component{

    render(){
        return(
            <div className="header">
                <div className="logo">
                    <img src={LoliCinemas}></img>
                </div>
                <div className="tool">
                    <Link to='/'>
                        <i><FontAwesomeIcon icon={faHome}/></i>
                    </Link>                   
                    <i><FontAwesomeIcon icon={faHeart}/></i>
                    <i><FontAwesomeIcon icon={faMap}/></i>
                </div>
                <div className="avatar">
                    <Link to='/login'>
                        <i><FontAwesomeIcon icon={faUser}/></i>
                    </Link>
                    <i><FontAwesomeIcon icon={faCog}/></i>
                </div>
            </div>
                
   
        );
    }
}
export default header;