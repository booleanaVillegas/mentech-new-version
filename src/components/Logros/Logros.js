import React from 'react';
import './Logros.css';

const Logros = (props) => {
    return (
        <ul className='logros'>
            {props.logros.map(function(item, i){
            
            return <li key={i} className='item-logro'>
                <img className='img-logro' style={{margin: '0',width: '10vw', height: '10vw'}} src={item.img} alt=""/>
                <div className="info-logro"><h1 style={{fontWeight: 'bold', margin: '0'}}>{item.nombre}</h1>
                <p style={{margin: '0'}}>{item.desc}</p></div>
            </li>})}         
        </ul>
    );
};

export default Logros;