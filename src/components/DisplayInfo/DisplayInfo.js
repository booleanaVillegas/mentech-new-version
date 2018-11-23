import React from 'react';
import './DisplayInfo.css';
import { Button } from 'antd';

const DisplayInfo = (props) => {
    return (
        <div className='display-info'>
            <h1 className="title-info">{props.titulo}</h1>
            <p className='text-info'>{props.contenido}</p>
            <Button style={{marginBottom:'20px'}} type="primary" onClick={props.volver}  className="login-button">
                Volver
            </Button>
        </div>
    );
};

export default DisplayInfo;