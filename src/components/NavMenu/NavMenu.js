import React from 'react';

import './NavMenu.css';

import {Icon } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const NavMenu = (props) => {
    
    const variable = true;
    const {auth}= props
    if(auth.uid){
        
    return (
   
        <section className='nav-menu'>                
            <Link to="/"> <div className='nav-item'><Icon className='icon-nav' type="home" theme="outlined" />
             <p style={{marginBottom: '0'}}>Inicio</p> </div></Link>  
            <Link to="/challenge"><div className='nav-item'> <Icon className='icon-nav' type="star" theme="outlined" />
             <p style={{marginBottom: '0'}}>Retos</p> </div> </Link> 
            <Link to="/learned"><div className='nav-item'> <Icon className='icon-nav' type="team" theme="outlined" />
             <p style={{marginBottom: '0'}}>Lecciones</p> </div></Link>  
            <Link to="/profile"><div className='nav-item'> <Icon className='icon-nav' type="user" theme="outlined" />
             <p style={{marginBottom: '0'}}>Perfil</p> </div> </Link> 
        </section>
      
    )}else{
        return(<div></div>);
    };
};

const mapStateToProps = (state)=>{
// console.log(state);
    return{
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(NavMenu);