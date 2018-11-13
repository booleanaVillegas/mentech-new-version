import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'antd';
import './Moderador.css';

import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

const Option = AutoComplete.Option;

class Moderador extends Component {
    state = {
        usersAutoC: [],
        valueAuto: ''
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
      onSelect= (value) => {
        this.setState({
valueAuto: value
        });
        console.log('onSelect', this.state.valueAuto);
        this.setState({
            valueAuto: ''
                    });
      }

      render() {

        const children = this.state.usersAutoC.map(function(user, i){
            return <Option value={user.id} key={i}>{user.nombre+" "+user.apellido}</Option>;
        });

        return (
            <section className='moderador'>
         <AutoComplete
        style={{ width: '90%' }}
        value= {this.state.valueAuto}
        onSearch={this.handleSearch}
        placeholder="Agrega a los mentores a la partida"
        onSelect={this.onSelect}
      >
        {children}
      </AutoComplete>
          </section>
        );
      }
    
}


function mapStateToProps(state) {
    return {
        users: state.firestore.ordered.users,
    };
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'users'}
       
    ])
)(Moderador);