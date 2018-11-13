import * as React from 'react';
import './Profile.css';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo.js'
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu.js'
import Logros from '../../components/Logros/Logros.js'

class Profile extends React.Component {

    constructor(props){
        super(props);
        this.uploadPicture= this.uploadPicture.bind(this);


        
    }

    uploadPicture = ()=>{
        console.log('Subi foto');
    }
    
    render(){
        const {auth, profile, logros} = this.props;
        if(!auth.uid) return <Redirect to='/login'/>;
 
     let logrosPersona = [];
       if(logros && profile.logros)  {        
            for(let j=0; j<profile.logros.length; j++){
                //console.log(logros[profile.logros[j]])
                   logrosPersona.push(logros[profile.logros[j]]);
            
            }
        }
          
         

  return ( 
    <section className='profile'>
        <ProfileInfo
        image={profile.avatar}
        name= {profile.nombre+" "+profile.apellido}
        age={profile.edad}
        barrio={profile.barrio}
        level={profile.nivel}
        editProfile={this.uploadPicture}
        />
        <ProfileMenu />        
        <Logros
        logros={logrosPersona}/>
    </section>
     
   ) ;
}
};
const mapStateToProps = (state) =>{
  // console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        logros: state.firestore.data.logros,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'users'},
        {collection: 'logros'}
    ])
)(Profile);