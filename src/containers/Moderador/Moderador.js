import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AutoComplete , Button} from 'antd';
import './Moderador.css';
import { newPartida } from '../../redux/actions/partidaActions'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

const Option = AutoComplete.Option;
const users = [];

class Moderador extends Component {

    constructor(props){
        super(props)
        this.state = {
            usersAutoC: [],
            usersForPartida: []
          }
          
    }
    

      handleSearch = (value) => {
        let temp = []; 
        let users = this.props.users;

        for (let i=0; i<users.length; i++){
            if (users[i].nombre.toLowerCase().includes(value.toLowerCase()) ||
            users[i].apellido.toLowerCase().includes(value.toLowerCase())){
                temp.push(users[i]);
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
           console.log(this.state.usersForPartida);
        }
        agregarPartida = () => {
this.props.crearPartida({jugadores: this.state.usersForPartida})
        }

      render() {

        const children = this.state.usersAutoC.map(function(user, i){
            return <Option value={user.id} key={i}>{user.nombre+" "+user.apellido}</Option>;
        });

        return (
            <section className='moderador'>
         <AutoComplete
        style={{ width: '90%' }}
        onSearch={this.handleSearch}
        placeholder="Agrega a los mentores a la partida"
        onSelect={this.onSelect}
      >
        {children}
      </AutoComplete>

      <Button type="primary" onClick={this.agregarPartida} className="login-button">
           Crear partida
          </Button>
          </section>
        );
      }
    
}


function mapStateToProps(state) {
    return {
        users: state.firestore.ordered.users,
    };
}
const mapDispatchToProps = (dispatch) => {
    return{
      crearPartida : (partida) => dispatch(newPartida(partida))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: 'users'}
       
    ])
)(Moderador);