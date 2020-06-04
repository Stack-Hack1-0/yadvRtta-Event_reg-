import React  from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
//import axios from 'axios';

const navBar = (props) =>{
        return(
            
            <div className="Nav">
                <ul>
                <li>   <NavLink to='/'>Home</NavLink></li> 
                <li>       <NavLink to='/adminlogin'>Admin Login</NavLink> </li>
                  </ul>
            </div>

        );
    }


export default navBar;