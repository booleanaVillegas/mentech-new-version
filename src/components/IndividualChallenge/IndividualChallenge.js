import React from 'react';
import {Button} from 'antd';
import './IndividualChallenge.css';

const IndividualChallenge = (props) => {
    /*switch (props.type) {
        case 'complex':
        return (
        
            <section className='indv-challenge'>
            <figure className="fig-challenge"><img className="img-challenge" src="https://images-eu.ssl-images-amazon.com/images/I/41BhKPIAyjL.png" alt="icon-group"/></figure>
                <h1 style={{ padding: '15px', fontSize:'20pt' }}>Trabajo en equipo</h1>
                <p className='text-challenge'>{props.challenge}</p>
                <Button style={{marginBottom:'20px'}} type="primary" onClick={props.volver}  className="login-button">
                        Volver
                    </Button>
            </section>
        
    );
        break;
        case 'simple':
        return (
        
            <section className='indv-challenge'>
            <figure className="fig-challenge"><img className="img-challenge" src="https://images-eu.ssl-images-amazon.com/images/I/41BhKPIAyjL.png" alt="icon-group"/></figure>
                <h1 style={{ padding: '15px', fontSize:'20pt' }}>Trabajo en equipo</h1>
                <p className='text-challenge'>{props.challenge}</p>
                <Button style={{marginBottom:'20px'}} type="primary" onClick={props.volver}  className="login-button">
                        Volver
                    </Button>
            </section>
        
    );
        break;
        case 'none':
        return <div></div>
        break;
        dafault:
        return <div></div>
        break;
    }*/
    return (
        
            <section className='indv-challenge'>
            <figure className="fig-challenge"><img className="img-challenge" src="https://images-eu.ssl-images-amazon.com/images/I/41BhKPIAyjL.png" alt="icon-group"/></figure>
                <h1 style={{ padding: '15px', fontSize:'20pt' }}>Trabajo en equipo</h1>
                <p className='text-challenge'>{props.challenge}</p>
               {/* <Button style={{marginBottom:'20px'}} type="primary" onClick={props.volver}  className="login-button">
                        Volver
                 </Button> */}
            </section>
        
    );
};

export default IndividualChallenge;