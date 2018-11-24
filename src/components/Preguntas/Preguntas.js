import React from 'react';
import './Preguntas.css';
//import { Button } from 'antd';

const Preguntas = (props) => {
    return (
        <div className='preguntas'>
            <h1 className="actual-question">{props.question.pregunta}</h1>
            <p id='a' className='question-item' onClick={(e)=>{
                props.validar(e);
            setTimeout(props.volver, 2000)
            }} >A) {props.question.a}</p>

            <p id='b' className='question-item' onClick={(e)=>{
                props.validar(e);
            setTimeout(props.volver, 2000)
            }} >B) {props.question.b}</p>
            <p id='c' className='question-item' onClick={(e)=>{
                props.validar(e);
            setTimeout(props.volver, 2000)
            }} >C) {props.question.c}</p>
            <h1 className="alert" style={{color: props.colorAlert}}>{props.result}</h1>
           {/* <Button style={{marginTop:'20px'}} type="primary" onClick={props.volver}>
                        Volver
        </Button> */}
                    
                    
        </div>
    );
};

export default Preguntas;