import * as React from 'react';
import './Login.css';
import FormLogin from '../../components/FormLogin/FormLogin.js'
import { connect } from 'react-redux'
import {signIn } from '../../redux/actions/authActions'
import {Redirect} from 'react-router-dom'


class Login extends React.Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: ''
            
        }
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.signIn(this.state)
    }

    render(){
        const {auth} = this.props;
        if(auth.uid) return <Redirect to='/'/>   
  return ( 
      <section className='login'>
        <FormLogin 
        submit={this.handleSubmit} 
        change={this.handleChange}
        error={this.props.authError}
        />
      </section>
     
   ) ;
}
};
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


