import * as React from 'react';
import './Challenge.css';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import IndividualChallenge from '../../components/IndividualChallenge/IndividualChallenge.js'
import { Button } from 'antd';
import { Redirect } from 'react-router-dom'
import Preguntas from '../../components/Preguntas/Preguntas'
import QrReader from "react-qr-reader";
import DisplayInfo from '../../components/DisplayInfo/DisplayInfo'

class Challenge extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            complex: false,
            simple: false,
            typeChallenge: 'none',
            result: "No result"
        }
        this.noChallenge = this.noChallenge.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
    }


    noChallenge = () => {
        this.setState({
            typeChallenge: 'none'
        });
    }

    handleScan(data) {
        if (data) {
            console.log(data)
            this.setState({
                typeChallenge: data,
                result: data
            });
            //this.props.history.push(data);
        }

    };
    handleError(err) {
        console.error(err);
    }
   
    handleClick = (e) => {
        console.log (e.target.id)
        this.setState({
            typeChallenge: e.target.id
        })
    };
    render() {
        const { challenges, auth, complex, preguntas, partida, sabiasques ,sorpresas } = this.props;

        //console.log(partida);
        //random rumber
        const number = challenges ? Math.floor(Math.random() * (challenges.length)) : 0;
        const numberComplex = complex ? Math.floor(Math.random() * (complex.length)) : 0;
        const numberPreguntas = preguntas? Math.floor(Math.random() * (preguntas.length)) : 0;
        const numberSorpresas = sorpresas? Math.floor(Math.random() * (sorpresas.length)) : 0;
        const numberSabiasques = sabiasques? Math.floor(Math.random() * (sabiasques.length)) : 0;

        //Selected item
        const actualPartida = partida? partida[0]: ''; 
        let myChallenge = challenges ? challenges[number] : null;
        let complexChallenge = complex ? complex[numberComplex] : null;
        let actualPregunta = preguntas? preguntas[numberPreguntas]: null;
        let actualSorpresa = sorpresas? sorpresas[numberSorpresas]: '';
        let actualSabiasque = sabiasques? sabiasques[numberSabiasques]: '';

        
        //   let myComplexChallenge = this.props.ComplexChallenges ? this.props.ComplexChallenges[number] : null;   
        if (!auth.uid) return <Redirect to='/login' />


        switch (this.state.typeChallenge) {
            case 'none':
                return (
                    <section className='challenge'>
                        <h1 style={{fontWeight: 'bold'}}>Resumen de la partida:</h1>
                        <h2>Equipo 1</h2>
                        <p>Puntos: {actualPartida.puntos1}</p>
                        <h2>Equipo 2</h2>
                        <p>Puntos: {actualPartida.puntos2}</p>

                        <div className="cont-icons-btn">
                            <img onClick={this.handleClick} id='qr' className='icons-buttons' src="/assets/qr.svg" alt=""/>
                            <img onClick={this.handleClick} id='sabiasque' className='icons-buttons' src="/assets/sabiasque.svg" alt=""/>
                            <img onClick={this.handleClick} id='pregunta' className='icons-buttons' src="/assets/pregunta.svg" alt=""/>
                            <img onClick={this.handleClick} id='sorpresa' className='icons-buttons' src="/assets/otro.svg" alt=""/>
                        </div>
                    </section>)
            case 'simple':
                return (
                    <section className='challenge'>

                        <IndividualChallenge challenge={myChallenge} volver={this.noChallenge} type={this.state.typeChallenge} />
                    </section>);

            case 'complex':
                return (
                    <section className='challenge'>

                        <IndividualChallenge challenge={complexChallenge} volver={this.noChallenge} type={this.state.typeChallenge} />
                    </section>)
            case 'qr':
                return (
                    <section className='challenge'>

                        <div className="qr-container">
                            <h1>Escanea el codigo que hay en el tablero</h1>
                            <QrReader
                              
                                onError={this.handleError}
                                onScan={this.handleScan}
                                className='qr-reader'
                            />
                            <p>{this.state.result}</p>
                            <Button style={{marginBottom:'20px'}} type="primary" onClick={this.noChallenge}  className="login-button">
                Volver
            </Button>
                        </div>
                    </section>)
            case 'pregunta':
                return (
                    <Preguntas className='challenge' question={actualPregunta} volver={this.noChallenge}/>
                )
            case 'sabiasque':
            return (
                <section className='challenge'>
                <DisplayInfo className='challenge' volver={this.noChallenge} titulo="¿Sabias Qué?" contenido={actualSabiasque.desc}/>
                </section>
            )
            case 'sorpresa':
            return(
                <section className='challenge'>
                <DisplayInfo className='challenge' volver={this.noChallenge} titulo="Casilla Sorpresa" contenido={actualSorpresa.desc}/>
                </section>
            )
            default:
                return (
                    <section className='challenge'>

                        <div className="qr-container">
                            <h1>Por favor, escanea un código válido</h1>
                            <QrReader
                               
                                onError={this.handleError}
                                onScan={this.handleScan}
                                className='qr-reader'
                            />
                            <p>{this.state.result}</p>
                            <Button style={{marginBottom:'20px'}} type="primary" onClick={this.noChallenge}  className="login-button">
                Volver
            </Button>
                        </div>
                    </section>
                )
        }








    }
};

const mapStateToProps = (state) => {
    // console.log(state);
    return {
        complex: state.firestore.ordered.complex,
        challenges: state.firestore.ordered.challenges,
        auth: state.firebase.auth,
        preguntas: state.firestore.ordered.preguntas,
        partida: state.firestore.ordered.partidas,
        sabiasques: state.firestore.ordered.sabiasque,
        sorpresas: state.firestore.ordered.sorpresas,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'complex' },
        { collection: 'challenges' },
        { collection: 'preguntas'},
        { collection: 'sabiasque'},
        { collection: 'sorpresas'},
        { collection: 'partidas', orderBy: ['fecha', 'desc'], limit: 1}
    ])
)(Challenge);