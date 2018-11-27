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
import { setPuntos } from '../../redux/actions/partidaActions'


class Challenge extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            typeChallenge: 'none',
            result: "No result",
            color: 'black',
            resultPregunta: ' ',
            partidaActual: ' ',
            pregunta: ' ',
            sabiasque: ' ',
            challenge: ' ',
            complex: ' ',
            sorpresa: ' ',
            setPartida: null,
        }
        this.noChallenge = this.noChallenge.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleScan = this.handleScan.bind(this);
        this.handleError = this.handleError.bind(this);
        this.setNewRandoms = this.setNewRandoms.bind(this);
        this.validarPregunta = this.validarPregunta.bind(this);


    }
    componentDidMount() {
       
       // let setPartida= setInterval(, 1000);
       //
       let setPartidita= setInterval(()=> this.partidaEnCurso(),1000) ;
       this.setState({setPartida: setPartidita})
    }
    componentWillUnmount(){
        clearInterval(this.state.setPartida);
    }
    partidaEnCurso= () => {
     
        const actualPartida = this.props.partida ? this.props.partida[0] : '';
       // console.log(actualPartida.enCurso)
        if(actualPartida.enCurso===true && actualPartida.jugadores.includes(this.props.auth.uid)){
            console.log('voy a cambiar el estado')
        this.setState({
            typeChallenge: 'partida',
            partidaActual: actualPartida
        });
        clearInterval(this.state.setPartida);
    }
       
    }

    noChallenge = () => {
        this.setState({
            typeChallenge: 'partida',
            resultPregunta: ''
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

        this.setNewRandoms();

        console.log(e.target.id)
        this.setState({
            typeChallenge: e.target.id
        })
    };

    validarPregunta = (e) => {
        console.log(e.target.id);
        if (e.target.id === this.state.pregunta.resp) {
            console.log('yay 5 puntos');
            this.setState({
                color: 'yellowgreen',
                resultPregunta: '¡Muy Bien!'
               
            });
            //console.log(this.state.partidaActual)
            if(this.state.partidaActual.equipo1.includes(this.props.auth.uid)){
                this.props.setPuntos(this.state.partidaActual,5,0);
            }else if (this.state.partidaActual.equipo2.includes(this.props.auth.uid)){
                this.props.setPuntos(this.state.partidaActual,0,5);
            }
            //
        } else if (e.target.id === this.state.pregunta.medioresp) {
            console.log('yay 3 puntos');
            this.setState({
                color: 'darkorange',
                resultPregunta: 'Más o menos'
            });
            if(this.state.partidaActual.equipo1.includes(this.props.auth.uid)){
                this.props.setPuntos(this.state.partidaActual,3,0);
            }else if (this.state.partidaActual.equipo2.includes(this.props.auth.uid)){
                this.props.setPuntos(this.state.partidaActual,0,3);
            }
        } else {
            console.log('nope 0 puntos');
            this.setState({
                color: 'crimson',
                resultPregunta: 'Incorrecto :('
            });
        }
    }
    setNewRandoms = () => {
        const { challenges, complex, preguntas, partida, sabiasques, sorpresas } = this.props;


        const number = challenges ? Math.floor(Math.random() * (challenges.length)) : 0;
        const numberComplex = complex ? Math.floor(Math.random() * (complex.length)) : 0;
        const numberPreguntas = preguntas ? Math.floor(Math.random() * (preguntas.length)) : 0;
        const numberSorpresas = sorpresas ? Math.floor(Math.random() * (sorpresas.length)) : 0;
        const numberSabiasques = sabiasques ? Math.floor(Math.random() * (sabiasques.length)) : 0;


        const actualPartida = partida ? partida[0] : '';
        let myChallenge = challenges ? challenges[number] : null;
        let complexChallenge = complex ? complex[numberComplex] : null;
        let actualPregunta = preguntas ? preguntas[numberPreguntas] : null;
        let actualSorpresa = sorpresas ? sorpresas[numberSorpresas] : '';
        let actualSabiasque = sabiasques ? sabiasques[numberSabiasques] : '';

        this.setState({
            partidaActual: actualPartida,
            pregunta: actualPregunta,
            sabiasque: actualSabiasque,
            challenge: myChallenge,
            complex: complexChallenge,
            sorpresa: actualSorpresa
        });
    }
    render() {
        const { auth, partida } = this.props;
        const actualPartida = partida ? partida[0] : ' ';
       // console.log(actualPartida);
    const myEquipo = partida?(actualPartida.equipo1.includes(auth.uid)?'Perteneces al equipo 1':actualPartida.equipo2.includes(auth.uid)?'Perteneces al equipo 2':''):'';

        if (!auth.uid) return <Redirect to='/login' />


        switch (this.state.typeChallenge) {
            case 'partida':
                return (
                    <section className='challenge'>
                    <h1 style={{ fontWeight: 'bold' }}>{myEquipo}</h1>
                    <br/>
                        <h1 style={{ fontWeight: 'bold' }}>Resumen de la partida:</h1>
                        <h2>Equipo 1</h2>
                        <p>Puntos: {actualPartida.puntos1}</p>
                        <h2>Equipo 2</h2>
                        <p>Puntos: {actualPartida.puntos2}</p>

                        <div className="cont-icons-btn">
                            {/*TODO:nvolver a cambiar simple por qr despues*/}
                            <img onClick={this.handleClick} id='qr' className='icons-buttons' src="/assets/qr.svg" alt="" />
                            <img onClick={(e)=>{
                                if(this.state.partidaActual.equipo1.includes(this.props.auth.uid)){
                                    this.props.setPuntos(this.state.partidaActual,2,0);
                                }else if (this.state.partidaActual.equipo2.includes(this.props.auth.uid)){
                                    this.props.setPuntos(this.state.partidaActual,0,2);
                                }
                                this.handleClick(e)}} id='sabiasque' className='icons-buttons' src="/assets/sabiasque.svg" alt="" />
                            <img onClick={this.handleClick} id='pregunta' className='icons-buttons' src="/assets/pregunta.svg" alt="" />
                            <img onClick={this.handleClick} id='sorpresa' className='icons-buttons' src="/assets/otro.svg" alt="" />
                        </div>
                    </section>)
            case 'none':
                return (
                    <section className='challenge'>
                        <h1 style={{ fontWeight: 'bold' }}>Actualmente no perteneces a ninguna partida</h1>
                    </section>)
            case 'simple':
                return (
                    <section className='challenge'>

                        <IndividualChallenge challenge={this.state.challenge} volver={this.noChallenge} type={this.state.typeChallenge} />
                    </section>);

            case 'complex':
                return (
                    <section className='challenge'>

                        <IndividualChallenge challenge={this.state.complex} volver={this.noChallenge} type={this.state.typeChallenge} />
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
                            <Button style={{ marginBottom: '20px' }} type="primary" onClick={this.noChallenge} className="login-button">
                                Volver
            </Button>
                        </div>
                    </section>)
            case 'pregunta':
                return (
                    <Preguntas className='challenge'
                        question={this.state.pregunta}
                        volver={this.noChallenge}
                        validar={this.validarPregunta}
                        colorAlert={this.state.color}
                        result={this.state.resultPregunta}
                    />
                )
            case 'sabiasque':
                return (
                    <section className='challenge'>
                        <DisplayInfo className='challenge' volver={this.noChallenge} titulo="¿Sabias Qué?" contenido={this.state.sabiasque.desc} />
                    </section>
                )
            case 'sorpresa':
                return (
                    <section className='challenge'>
                        <DisplayInfo className='challenge' volver={this.noChallenge} titulo="Casilla Sorpresa" contenido={this.state.sorpresa.desc} />
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
                            <Button style={{ marginBottom: '20px' }} type="primary" onClick={this.noChallenge} className="login-button">
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
const mapDispatchToProps = (dispatch) => {
    return {
        setPuntos: (partida, equipo1, equipo2) => dispatch(setPuntos(partida, equipo1, equipo2))
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'complex' },
        { collection: 'challenges' },
        { collection: 'preguntas' },
        { collection: 'sabiasque' },
        { collection: 'sorpresas' },
        { collection: 'partidas', orderBy: ['fecha', 'desc'], limit: 1 }
    ])
)(Challenge);