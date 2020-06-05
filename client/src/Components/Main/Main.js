

import React,{ Component } from 'react';
import "./Main.css";
import { Redirect } from 'react-router-dom';
import NavBar from './NavBar/NavBar';

class Main extends Component{
    state = {
        redirect : false
    }
    onRegister = () =>{
        this.setState({redirect: true});
    }
    render(){
         let renRedirect = null;
        if(this.state.redirect){
            renRedirect = <Redirect to="/register"/>
        }
        return(
            
            <div className="Main">
               <div className="Header">
                   <NavBar/>
               </div>
                <div className="Register">
                <h1>REGISTER SOON!!!!
                </h1>
                <button onClick = {this.onRegister}>REGISTER</button>
                {renRedirect}
                </div>
            </div>

        );
    }
}

export default Main;
