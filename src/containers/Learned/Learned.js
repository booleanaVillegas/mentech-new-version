import * as React from 'react';
import './Learned.css';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Timer from '../../components/Timer/Timer'

class Learned extends React.Component {
    
    render(){
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to='/login'/>   
  return ( 
      <section className='learned'>
    <Timer time={1} type='minutes'/>

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
