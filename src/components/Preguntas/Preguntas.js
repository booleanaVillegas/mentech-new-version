import React from 'react';
import './Preguntas.css';

const Preguntas = (props) => {
    return (
        <div className='preguntas'>
            <h1 className="actual-question">{props.question.pregunta}</h1>
            <p id='a' className='question-item' >A) {props.question.a}</p>
            <p id='b' className='question-item' >B) {props.question.b}</p>
            <p id='c' className='question-item' >C) {props.question.c}</p>

        </div>
    );
};

export default Preguntas;