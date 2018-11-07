import * as React from 'react';
import './Learned.css';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Learned extends React.Component {
    
    render(){
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to='/login'/>   
  return ( 
      <section className='learned'>
     <h1 style={{padding: '15px'}}> Hola esta es la pagina de cosas aprendidas
         Elige una de las opciones de abajo </h1>

      </section>
     
   ) ;
}
};
const mapStateToProps = (state) =>{
    console.log(state);
    return{
        auth: state.firebase.auth
    }
}
export default connect(mapStateToProps)(Learned);
