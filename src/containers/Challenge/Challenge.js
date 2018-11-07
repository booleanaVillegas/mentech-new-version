import * as React from 'react';
import './Challenge.css';
import { connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import IndividualChallenge from '../../components/IndividualChallenge/IndividualChallenge.js'
import { Route } from "react-router-dom";
import {Button} from 'antd';
import {Redirect} from 'react-router-dom'

class Challenge extends React.Component {
   
    constructor(props){
        super(props)
        this.state={
            complex: false,
            simple: false,
            typeChallenge: 'none'
        }
        this.complexChallenge= this.complexChallenge.bind(this);
    }

    complexChallenge = ()=>{
        this.setState({
            typeChallenge: 'complex'
        })
       
    }
    simpleChallenge = () =>{
        this.setState({
            typeChallenge: 'simple'
        })
   
    }
    noChallenge = () =>{
        this.setState({
            typeChallenge: 'none'
        }) 
       
    }

    render() {
        const {challenges, auth} = this.props;

        
        const number= Math.floor(Math.random()*6);
        let myChallenge = challenges ? challenges[number].descripcion : null;
     //   let myComplexChallenge = this.props.ComplexChallenges ? this.props.ComplexChallenges[number] : null;   
     if(!auth.uid) return <Redirect to='/login'/>
     console.log(myChallenge);
         return (
             <section className='challenge'>
                  {/* <Button style={{margin:'10px'}} type="primary" onClick={this.complexChallenge}  className="login-button">
                        Retos compuestos
                    </Button>
                    <Button style={{margin:'10px'}} type="primary" onClick={this.simpleChallenge}  className="login-button">
                        Retos Simples
         </Button> */}
                   
                <IndividualChallenge challenge={myChallenge} volver={this.noChallenge} />
                 {/* <Route exact path='/basic'  render={(props) => <IndividualChallenge {...props} challenge={myChallenge}/>}/> */}
                 
             </section>
            
        );
    }
};

const mapStateToProps = (state)=>{
        console.log(state);
    return {
        challenges: state.firestore.ordered.challenges,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'challenges'}
    ])
)(Challenge);