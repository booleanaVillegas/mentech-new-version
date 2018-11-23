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
        email: '',
        password: '',
        confPass: '',           
    }
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    
}

handleChange = (e) =>{
  
    this.setState({
        [e.target.id]: e.target.value
    })
    console.log(this.state)
    
}

handleSubmit = (e) =>{
    e.preventDefault();
    if(this.state.confPass === this.state.password){
      this.props.signUp(this.state)
    }
    
}

  render() {
    const {auth} = this.props;
        if(auth.uid) return <Redirect to='/'/>   
    return (
      <section className='sign-up'>
       <figure className="fig-logo">
      <img src="/assets/logo.png" alt="" className="img-logo"/>
      </figure>
        <FormSignUp 
        submit={this.handleSubmit} 
        change={this.handleChange}
        error={this.props.authError}
        
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