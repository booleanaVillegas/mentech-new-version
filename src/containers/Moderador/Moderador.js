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
           console.log(value);
          var element = document.getElementById('autocomplete');
          console.log(element)
          /*   element.parentNode.removeChild(element);
          console.log(  document.getElementById('autocomplete').getElementsByClassName("ant-input")[0])
        */
        }
        agregarPartida = () => {
        
            this.props.crearPartida({jugadores: this.state.usersForPartida})
        }

      render() {

       const {usersPorId} = this.props;
       const chosen = usersPorId?this.state.usersForPartida.map(function(user, i){
            return <li key={i}>{usersPorId[user].nombre+" "+usersPorId[user].apellido}</li>;
        }):null;
        
        const children = this.state.usersAutoC.map(function(user, i){
            return <Option value={user.id} key={i}>{user.nombre+" "+user.apellido}</Option>;
        });
       // console.log(usersPorId);
       // console.log(users);
        return (
            <section className='moderador'>
        <div className="container-autocomplete">
        <h1 className="title">Elige aqui a los jugadores</h1>
                <AutoComplete
                id= 'autocomplete'
                style={{ width: '90%' }}
                onSearch={this.handleSearch}
                placeholder="Agrega a los mentores a la partida"
                onSelect={this.onSelect}
        allowClear={true}
            >
                {children}
            </AutoComplete>

     
          </div>
       <div className="container-users-puntos">
       <h1 className="title">Jugadores elegidos</h1>
        <ul>

            {chosen}

        </ul>
        <Button type="primary" onClick={this.agregarPartida} className="login-button">
           Crear partida
          </Button>
        </div> 
          </section>
        );
      }
    
}


function mapStateToProps(state) {
    return {
        users: state.firestore.ordered.users,
        usersPorId: state.firestore.data.users
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