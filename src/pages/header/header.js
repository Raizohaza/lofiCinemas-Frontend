import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Nav,Dropdown } from 'react-bootstrap';
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
                <div className="avatar"><Dropdown as={Nav.Item}>

              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle="dropdown"
                id="navbarDropdownMenuLink"
                variant="default"
                className="m-0"
              >
                <i className="icon-color"><FontAwesomeIcon icon={faUser}/></i>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">
                <Dropdown.Item>
                <Link to='/register'>
                        Register
                </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                <Link to='/login'>
                     login
                </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                <Link to={`/profile/${localStorage.id}`}>
                     profile
                </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Something else here
                </Dropdown.Item>
                <div className="divider"></div>
                <Dropdown.Item
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  Separated link
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>                    
                </div>
            </div>
                
   
        );
    }
}
export default header;