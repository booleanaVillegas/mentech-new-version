import React from 'react';
import {Button} from 'antd';
import './IndividualChallenge.css';

const IndividualChallenge = (props) => {
    switch (props.type) {
        case 'complex':
        return (
        
            <section className='indv-challenge'>
            <figure className="fig-challenge-complex"><img className="img-challenge" src="https://image.flaticon.com/icons/svg/476/476863.svg" alt="icon-group"/></figure>
               <div className="cont-info-reto">
                <h1 style={{ padding: '15px', fontSize:'20pt' }}>Conflicto</h1>
                <p className='text-challenge'>{props.challenge.identificacion}</p>
                <p className='text-challenge'>{props.challenge.posibilitacion}</p>
                <p className='text-challenge'>{props.challenge.proposicion}</p>
                <Button style={{marginBottom:'20px'}} type="primary" onClick={props.volver}  className="login-button">
                        Volver
                    </Button>
                    </div>
            </section>
        
            );
        
        case 'simple':
        return (
        
            <section className='indv-challenge'>
            <figure className="fig-challenge"><img className="img-challenge" src="https://image.flaticon.com/icons/svg/476/476863.svg" alt="icon-group"/></figure>
                <div className='cont-info-reto'>
                <h1 style={{ padding: '15px', fontSize:'20pt' }}>{props.challenge.tema}</h1>
                <p className='text-challenge'>{props.challenge.descripcion}</p>
                <Button style={{marginBottom:'20px'}} type="primary" onClick={props.volver}  className="login-button">
                        Volver
                    </Button>
                    </div>
            </section>
        
            );
        
        case 'none':
        return <div></div>
        
        default:
        return <div></div>
        
    }
   /* return (
        
            <section className='indv-challenge'>
            <figure className="fig-challenge"><img className="img-challenge" src="https://images-eu.ssl-images-amazon.com/images/I/41BhKPIAyjL.png" alt="icon-group"/></figure>
                <h1 style={{ padding: '15px', fontSize:'20pt' }}>Trabajo en equipo</h1>
                <p className='text-challenge'>{props.challenge}</p>
              
            </section>
        
    );*/
};

export default IndividualChallenge;