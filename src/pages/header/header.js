import React, { useLayoutEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Nav,Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {logOut} from "features/user/userSlice";
import { 
    faHome,
    faMap,
    faUser
} from '@fortawesome/free-solid-svg-icons'

import './header.css'
import LofiCinemas from '../../assets/img/loli-cinemas.svg'

export function Header(){
    let curUser =  useSelector(state=> state.user);
    const dispatch = useDispatch();
    const [cUser,setCuser] = useState(curUser);
    
    useLayoutEffect(()=>{
      setCuser(curUser);
    },[curUser])
    return(
        <div className="header">
            <div className="logo">
                <img src={LofiCinemas} alt=""></img>
            </div>
            <div className="tool">
                <Link to='/'>
                    <i className="icon-color"><FontAwesomeIcon icon={faHome}/></i>
                </Link>
                <Link to='/cineplex'>
                <i className="icon-color"><FontAwesomeIcon icon={faMap}/></i>
                  </Link>               
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
                        {cUser.loggedIn?
                        <>                          
                        <Dropdown.Item>
                          <Link to={`/profile/${cUser.User.id}`}>Profile</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to={`/history`}>History</Link>
                        </Dropdown.Item>
                        {cUser.Role == "admin" ?
                        <Dropdown.Item>
                        <Link to={`/admin/dashboard`}>Admin</Link>
                      </Dropdown.Item> :<div></div>
                        }
                        <Dropdown.Item>
                          <Link to={`/`} onClick={(e)=>{
                            dispatch(logOut());
                          }} >Log out</Link>
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