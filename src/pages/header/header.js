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
                <div className="tool2" >
                <i className="icon-color-so2">
                      <Dropdown>                
                        <Dropdown.Toggle
                          aria-expanded={false}
                          aria-haspopup={true}
                          as={Nav.Link}
                          data-toggle="dropdown"
                          id="navbarDropdownMenuLink"
                          variant="default"
                          className="m-0"
                        >
                          <FontAwesomeIcon icon={faUser} /> 
                        </Dropdown.Toggle>
                        <Dropdown.Menu aria-labelledby="navbarDropdownMenuLink">                         
                          {localStorage.UID ?
                          <>                          
                          <Dropdown.Item>
                            <Link to={`/profile/${localStorage.UID}`}>Profile</Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link to={`/`} onClick={(e)=>{
                              localStorage.clear()
                              ;}} >Log out</Link>
                          </Dropdown.Item>
                          </>
                          :
                          <>
                            <Dropdown.Item>
                              <Link to='/login'>Login</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Link to='/register'>Register</Link>
                            </Dropdown.Item>
                          </>
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </i>
                </div>
            </div>
        );
    }
}
export default header;