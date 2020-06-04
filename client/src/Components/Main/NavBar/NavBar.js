import React  from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
//import axios from 'axios';

const navBar = (props) =>{
        return(
            
            <div className="Nav">
                <ul>
                  <li><NavLink to='/' style={{color: 'rgb(0,0,0)', textDecoration:'none', fontWeight:'100'}}
                  activeStyle={{color: 'rgb(231,102,16)',textDecoration: 'underline'}}>HOME</NavLink></li>
                  <li><NavLink to='/adminlogin' style={{color: 'rgb(0,0,0)', textDecoration:'none',fontWeight:'100'}}
                  activeStyle={{color: 'rgb(231,102,16)',textDecoration: 'underline'}}>admin login</NavLink></li>
                  </ul>
            </div>

        );
    }


export default navBar;