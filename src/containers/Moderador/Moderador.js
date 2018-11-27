import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Button, Input } from 'antd';
import './Moderador.css';
import { newPartida } from '../../redux/actions/partidaActions'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import CrearPartida from '../../components/CrearPartida/CrearPartida'
import { setPuntos } from '../../redux/actions/partidaActions'
import { finalizarPartida } from '../../redux/actions/partidaActions'
import ModeradorLogin from '../../components/ModeradorLogin/ModeradorLogin'

const Option = AutoComplete.Option;
const users = [];

class Moderador extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usersAutoC: [],
            usersForPartida: [],
            partida: {
                id: ""
            },
            equipo1: '1',
            equipo: '2',
            isLogged: localStorage.getItem('isLogged'),
            contra: ''
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.agregarPartida = this.agregarPartida.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount() {
        console.log(localStorage.getItem('isLogged') ? 'existe' : 'no existe');
        if (!localStorage.getItem('isLogged')) {
            console.log('entré')
            localStorage.setItem('isLogged', 'false');
        }
       /* this.setState({
            isLogged: localStorage.getItem('isLogged'),

        })*/

  
        
    }

    handlePäss=(e) =>{
        this.setState({
            contra: e.target.value
        })

    }
    handleClickLogin=()=>{
        if (this.state.contra==='soymoderador'){
            localStorage.setItem('isLogged', 'true');
            this.setState({
                isLogged: 'true'
            })
        }
    }
    logoutModerador=()=>{

            localStorage.setItem('isLogged', 'false');
            this.setState({
                isLogged: 'false'
            })
        
    }

    handleSearch = (value) => {
        let temp = [];
        let usersFb = this.props.users;

        for (let i = 0; i < usersFb.length; i++) {
            if (usersFb[i].nombre.toLowerCase().includes(value.toLowerCase())) {
                temp.push(usersFb[i]);
            }
        }
        //  console.log(this.props.users)
        this.setState({
            usersAutoC: temp,
            valueAuto: value
        });
    }
    onSelect = (value) => {
        users.push(value)
        this.setState({
            usersForPartida: users
        })
        console.log(value);
        var element = document.getElementById('autocomplete');
        console.log(element)
        /*   element.parentNode.removeChild(element);
        console.log(  document.getElementById('autocomplete').getElementsByClassName("ant-input")[0])
      */
    }
    agregarPartida = () => {
        if (this.state.usersForPartida.length >= 4) {

            this.props.crearPartida({
                jugadores: this.state.usersForPartida
            })
        }
    }
    handleInput = (e) => {

        this.setState({
            [e.target.id]: e.target.value
        })
    }
    onClickSetPuntos = (equipo) => {
        const {
            partida
        } = this.props;
        let actualPartida = partida ? partida[0] : ' ';
        this.setState({
            partida: actualPartida,
        });
        switch (equipo) {
            case 1:
                this.props.setPuntos(actualPartida, this.state.equipo1, 0);
                break;
            case 2:
                this.props.setPuntos(actualPartida, 0, this.state.equipo2);
                break;
            default:
                console.log('no me llego el numero que era');
        }


    }
    partidaOver = () => {
        const {
            partida
        } = this.props;
        let actualPartida = partida ? partida[0] : ' ';
        this.setState({
            partida: actualPartida,
        });
        this.props.finalizarPartida(actualPartida);
    }
    deleteUser = (uid) => {
        //    console.log('hola');
        let number = this.state.usersForPartida.indexOf(uid);
        console.log(number)
        users.splice(number, 1)
        this.setState({
            usersForPartida: users
        })
    }

    render() {

        const { usersPorId, partida } = this.props;
        let chosen = usersPorId ? this.state.usersForPartida.map((user, i) => {
            return <li onClick={() => {
                //  console.log('holiwis');
                this.deleteUser(user)
            }} key={i}>{usersPorId[user].nombre}</li>;
        }) : null;

        const children = this.state.usersAutoC.map(function (user, i) {
            return <Option value={user.id} key={i}>{user.nombre}</Option>;
        });

        let actualPartida = partida ? partida[0] : ' ';
        //console.log(actualPartida);

        if(this.state.isLogged==='false') return <ModeradorLogin ingresar={this.handleClickLogin} change={this.handlePäss} className='moderador'/>
        



        if (!!actualPartida && actualPartida.enCurso) {

            const equipo1 = actualPartida !== ' ' ? actualPartida.equipo1.map(function (user, i) {
                return <li key={i}>{usersPorId[user].nombre}</li>;
            }) : '';
            const equipo2 = actualPartida !== ' ' ? actualPartida.equipo2.map(function (user, i) {
                return <li key={i}>{usersPorId[user].nombre}</li>;
            }) : '';
            return (
                <section className='moderador'>
                    <figure className="fig-logo-mod">
                        <img src="/assets/logo.png" alt="" className="img-logo-mod" />
                    </figure>
                    <h1 className="title-moderador">Moderador</h1>
                    <div className="resumen-equipos">
                        <div className="cont-equipo">
                            <h1 style={{fontWeight:'bold'}}> Equipo 1</h1>
                            <h1> Puntos: {actualPartida.puntos1} </h1>
                            <ul>{equipo1}</ul>
                            <Input type="text" id='equipo1' onChange={this.handleInput} placeholder='Agregar puntos' />
                            <Button style={{marginTop:'20px'}} type="primary" onClick={() => this.onClickSetPuntos(1)} className="login-button">Agregar</Button>
                        </div>
                        <div className="cont-equipo">
                            <h1 style={{fontWeight:'bold'}}> Equipo 2</h1>
                            <h1> Puntos: {actualPartida.puntos2} </h1>
                            <ul>{equipo2}</ul>
                            <Input type="text" id='equipo2' onChange={this.handleInput} placeholder='Agregar puntos' />
                            <Button style={{marginTop:'20px'}} type="primary" onClick={() => this.onClickSetPuntos(2)} className="login-button">Agregar</Button>
                        </div>
                    </div>
                    <Button type="primary" onClick={this.partidaOver} className="login-button">Finalizar Partida</Button>
                    <Button type="primary" style={{margin:'20px'}} onClick={this.logoutModerador} className="login-button">Cerrar Sesión de moderador</Button>
                </section>
            )
        }
        else if (!!actualPartida && !actualPartida.enCurso) {
            return (
                <section className='moderador'>
                    <CrearPartida
                        search={this.handleSearch} select={this.onSelect}
                        children={children} chosen={chosen}
                        agregar={this.agregarPartida}
                        logout={this.logoutModerador}

                    />
<Button style={{marginBottom:'30px'}} type="primary" onClick={this.logoutModerador} className="login-button">Cerrar Sesión de moderador</Button>
                </section>
            );

        } else if (!actualPartida) {
            return (
                <div></div>
            )
        }
    }

}


function mapStateToProps(state) {
    return {
        users: state.firestore.ordered.users,
        usersPorId: state.firestore.data.users,
        partida: state.firestore.ordered.partidas ? state.firestore.ordered.partidas : ' '
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        crearPartida: (partida) => dispatch(newPartida(partida)),
        setPuntos: (partida, equipo1, equipo2) => dispatch(setPuntos(partida, equipo1, equipo2)),
        finalizarPartida: (partida) => dispatch(finalizarPartida(partida))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
        { collection: 'partidas', orderBy: ['fecha', 'desc'], limit: 1 }
    ])
)(Moderador);