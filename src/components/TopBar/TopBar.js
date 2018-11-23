import React from 'react';
import './TopBar.css';
import {withRouter} from 'react-router'
import { connect } from 'react-redux';

const TopBar = (props) => {
    const {auth}= props
    if(auth.uid && props.location.pathname!=='/moderador'){
    return (
        <div className='top-bar'>
           <h1 className='title'>
           {props.location.pathname.substr(1, props.location.pathname.length-1).length>1?props.location.pathname.substr(1, props.location.pathname.length-1):'home'}</h1> 
           
        </div>
    );
}else{
    return(<div></div>)
}
};
const mapStateToProps = (state)=>{
    // console.log(state);
        return{
            auth: state.firebase.auth
        }
    }
    
    export default withRouter(connect(mapStateToProps)(TopBar))
