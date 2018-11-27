import React from 'react';
import './ProfileInfo.css';

const ProfileInfo = (props) => {
    return (
        <div className="profile-info">
        <div className="profilepic">
        <figure className="figure-perfil" style={{backgroundImage: 'url("'+props.image+'")'}}></figure>
       </div>
        <div className="mentor-info">
            <h1 className='profile-name'> {props.name} </h1>       
            <h1 className='lil-info' style={{marginBottom: '0'}}>{props.barrio}</h1>      
            <h1 className='lil-info' style={{marginBottom: '0'}}>{"Nivel "+ props.level}</h1>
           {/* <h3 onClick={props.editProfile}>Cambiar imagen</h3>*/}
        </div>

        </div>
    );
};

export default ProfileInfo;