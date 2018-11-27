import React from 'react';
import './ModeradorLogin.css';
import {Icon, Button, Input} from 'antd'
const ModeradorLogin = (props) => {
    return (
        <div className='moderador-login'>
            <h1 className="title-moderador">Ingresa el password de moderador</h1>
            <Input style={{width:'300px',margin:'15px'}}prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            type="password" id='password' placeholder="Contraseña" onChange={props.change}/>
            <Button type="primary" onClick={props.ingresar} className="login-button">
            Ingresar
          </Button>
        </div>
    );
};

export default ModeradorLogin;