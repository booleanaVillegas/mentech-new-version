import React from 'react';
import {Icon } from 'antd';
import { Link } from "react-router-dom";
import './ProfileMenu.css';

const ProfileMenu = () => {
    return (
        <section className='profile-menu'>                
            <Link to="/profile/stats"> <div className='profile-item'><Icon className='icon-profile' type="bar-chart" theme="outlined" />
            <p style={{marginBottom: '0'}}>Éstadisticas</p> </div></Link>  
            <Link to="/profile/medals"><div className='profile-item'> <Icon className='icon-profile' type="smile" theme="outlined" />
            <p style={{marginBottom: '0'}}>Medallas</p> </div> </Link> 
            <Link to="/profile/trophies"><div className='profile-item'> <Icon className='icon-profile' type="trophy" theme="outlined" />
            <p style={{marginBottom: '0'}}>Logros</p> </div></Link>  
            <Link to="/profile/activity"><div className='profile-item'> <Icon className='icon-profile' type="radar-chart" theme="outlined" />
            <p style={{marginBottom: '0'}}>Actividad</p> </div> </Link> 
        </section>
    );
};

export default ProfileMenu;