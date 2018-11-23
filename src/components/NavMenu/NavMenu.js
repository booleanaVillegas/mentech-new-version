import React from 'react';

import './NavMenu.css';
import {withRouter} from 'react-router'
import {Icon } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

const NavMenu = (props) => {
   
    const {auth}= props
    if(auth.uid && props.location.pathname!=='/moderador'){
    return (
   
        <section className='nav-menu'>                
            <Link style={{color: '#1d2539'}} to="/"> <div className='nav-item'><Icon className='icon-nav' type="home" theme="outlined" />
             <p style={{marginBottom: '0'}}>Inicio</p> </div></Link>  
            <Link style={{color: '#1d2539'}} to="/juego"><div className='nav-item'> <Icon className='icon-nav' type="star" theme="outlined" />
             <p style={{marginBottom: '0'}}>Juego</p> </div> </Link> 
            <Link style={{color: '#1d2539'}} to="/lecciones"><div className='nav-item'> <Icon className='icon-nav' type="team" theme="outlined" />
             <p style={{marginBottom: '0'}}>Lecciones</p> </div></Link>  
            <Link style={{color: '#1d2539'}} to="/perfil"><div className='nav-item'> <Icon className='icon-nav' type="user" theme="outlined" />
             <p style={{marginBottom: '0'}}>Perfil</p> </div> </Link> 
        </section>
      
    )}else{
        return(<div></div>)
    }
}

const mapStateToProps = (state)=>{
// console.log(state);
    return{
        auth: state.firebase.auth
    }
}

export default withRouter(connect(mapStateToProps)(NavMenu));