import * as React from 'react';
import './Challenge.css';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import IndividualChallenge from '../../components/IndividualChallenge/IndividualChallenge.js'
import { Button } from 'antd';
import { Redirect } from 'react-router-dom'
import Preguntas from '../../components/Preguntas/Preguntas'
import QrReader from "react-qr-reader";

class Challenge extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            complex: false,
            simple: false,
            typeChallenge: 'none',
            result: "No result"
        }
        this.complexChallenge = this.complexChallenge.bind(this);
        this.handleScan = this.handleScan.bind(this);
    }

    complexChallenge = () => {
        this.setState({
            typeChallenge: 'complex'
        })

    }
    simpleChallenge = () => {
        this.setState({
            typeChallenge: 'simple'
        })

    }
    noChallenge = () => {
        this.setState({
            typeChallenge: 'none'
        })

    }
    handleQR = () => {
        this.setState({
            typeChallenge: 'qr'
        })
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

    }
    handleError(err) {
        console.error(err);
    }
    handleQuestion = () => {
        this.setState({
            typeChallenge: 'pregunta'
        })
    }

    render() {
        const { challenges, auth, complex, preguntas } = this.props;

        // console.log(this.props);
        const number = challenges ? Math.floor(Math.random() * (challenges.length)) : 0;
        const numberComplex = complex ? Math.floor(Math.random() * (complex.length)) : 0;
        const numberPreguntas = preguntas? Math.floor(Math.random() * (preguntas.length)) : 0;

        let myChallenge = challenges ? challenges[number] : null;
        let complexChallenge = complex ? complex[numberComplex] : null;
        let actualPregunta = preguntas? preguntas[numberPreguntas]: null;
        //   let myComplexChallenge = this.props.ComplexChallenges ? this.props.ComplexChallenges[number] : null;   
        if (!auth.uid) return <Redirect to='/login' />


        switch (this.state.typeChallenge) {
            case 'none':
                return (
                    <section className='challenge'>

                        <div className='buttons'>
                            <Button style={{ margin: '10px' }} type="primary" onClick={this.complexChallenge} className="login-button">
                                Retos compuestos
                        </Button>
                            <Button style={{ margin: '10px' }} type="primary" onClick={this.simpleChallenge} className="login-button">
                                Retos Simples
                        </Button>
                            <Button style={{ margin: '10px' }} type="primary" onClick={this.handleQR} className="login-button">
                                Leer código
                        </Button>
                            <Button style={{ margin: '10px' }} type="primary" onClick={this.handleQuestion} className="login-button">
                                Pregunta
                        </Button>
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
                                delay={100}
                                onError={this.handleError}
                                onScan={this.handleScan}
                                className='qr-reader'
                            />
                            <p>{this.state.result}</p>
                        </div>
                    </section>)
            case 'pregunta':
                return (
                    <Preguntas className='challenge' question={actualPregunta}/>
                )
            default:
                return (
                    <section className='challenge'>

                        <div className="qr-container">
                            <h1>Por favor, escanea un código válido</h1>
                            <QrReader
                                delay={100}
                                onError={this.handleError}
                                onScan={this.handleScan}

                                className='qr-reader'
                            />
                            <p>{this.state.result}</p>
                        </div>
                    </section>
                )
        }








    }
};

const mapStateToProps = (state) => {
    //    console.log(state);
    return {
        complex: state.firestore.ordered.complex,
        challenges: state.firestore.ordered.challenges,
        auth: state.firebase.auth,
        preguntas: state.firestore.ordered.preguntas
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'complex' },
        { collection: 'challenges' },
        { collection: 'preguntas'}
    ])
)(Challenge);