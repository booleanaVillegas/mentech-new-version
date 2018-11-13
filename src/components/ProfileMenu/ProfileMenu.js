import React from 'react';
import {Icon } from 'antd';
import { Link } from "react-router-dom";
import './ProfileMenu.css';

const ProfileMenu = () => {
    return (
        <section className='profile-menu'>                
            <Link style={{color: '#1d2539'}} to="/perfil/stats"> <div className='profile-item'><Icon className='icon-profile' type="bar-chart" theme="outlined" />
            <p style={{marginBottom: '0'}}>Estadísticas</p> </div></Link>  
            <Link style={{color: '#1d2539'}} to="/perfil/trophies"><div className='profile-item'> <Icon className='icon-profile' type="trophy" theme="outlined" />
            <p style={{marginBottom: '0'}}>Logros</p> </div></Link>  
            <Link style={{color: '#1d2539'}} to="/perfil/activity"><div className='profile-item'> <Icon className='icon-profile' type="radar-chart" theme="outlined" />
            <p style={{marginBottom: '0'}}>Actividad</p> </div> </Link> 
        </section>
    );
};

export default ProfileMenu;