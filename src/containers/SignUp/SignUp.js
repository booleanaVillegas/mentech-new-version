import React, { Component } from 'react'
import './SignUp.css';
import FormSignUp from '../../components/FormSignUp/FormSignUp.js'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {signUp} from '../../redux/actions/authActions'

class SignUp extends Component {

  constructor(props){
    super(props)
    this.state={
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confPass: '',
        edad: '',
        barrio: ''        
    }
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.handleChangeEdad= this.handleChangeEdad.bind(this);
    this.handleChangeBarrio= this.handleChangeBarrio.bind(this);
}

handleChange = (e) =>{
  
    this.setState({
        [e.target.id]: e.target.value
    })
    console.log(this.state)
    
}
handleChangeEdad = (e)=>{
  this.setState({
    edad: e
})
}
handleChangeBarrio = (e)=>{
  this.setState({
    barrio: e
})
}

handleSubmit = (e) =>{
    e.preventDefault();
    console.log("holita");
    this.props.signUp(this.state)
}

  render() {
    const {auth} = this.props;
        if(auth.uid) return <Redirect to='/'/>   
    return (
      <section className='sign-up'>
        <FormSignUp 
        submit={this.handleSubmit} 
        change={this.handleChange}
        error={this.props.authError}
        cEdad={this.handleChangeEdad}
        cBarrio={this.handleChangeBarrio}
        />
      </section>
    )
  }
}
const mapStateToProps = (state) =>{
  console.log(state);
  return{
      auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);