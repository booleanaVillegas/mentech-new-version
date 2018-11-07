import * as React from 'react';
import './Main.css';
import {Button} from 'antd';
import {connect} from 'react-redux'
import {signOut} from '../../redux/actions/authActions'
import {Redirect} from 'react-router-dom'

class Main extends React.Component {
    constructor(props){
        super(props)}

    render(){
const {auth} = this.props;
if(!auth.uid) return <Redirect to='/login'/>
  return ( 
        <section className='main'>
        <h1 style={{padding: '15px'}}> Hola esta es la pagina principal 
         Elige una de las opciones de abajo </h1>
         
        <Button style={{marginBottom:'20px'}} type="primary" onClick={this.props.signOut}  className="login-button">
            Log out
        </Button>
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

const mapDispatchToProps = (dispatch) =>
{
    return{
        signOut: ()=> dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);