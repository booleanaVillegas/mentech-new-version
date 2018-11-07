import React from 'react';
import './ProfileInfo.css';

const ProfileInfo = (props) => {
    return (
        <div className="profile-info">
        <div className="profilepic"><img src={props.image} alt=""/></div>
        <div className="mentor-info">
            <h1 style={{fontSize: '16pt', fontWeight: 'bold', marginBottom: '0'}}> {props.name} </h1>
            <div className='profile-mini-info'>
            <h1 style={{marginBottom: '0'}}>{props.age +" Años"}</h1>
            <h1 style={{marginBottom: '0'}}>{props.barrio}</h1></div>      
            <h1 style={{marginBottom: '0'}}>{"Nivel "+ props.level}</h1>
           {/* <h3 onClick={props.editProfile}>Cambiar imagen</h3>*/}
        </div>

        </div>
    );
};

export default ProfileInfo;