import * as React from 'react';
import './Profile.css';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo.js'
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu.js'

class Profile extends React.Component {

    constructor(props){
        super(props);

        this.uploadPicture= this.uploadPicture.bind(this);
    }

    uploadPicture = ()=>{
        console.log('Subi foto');
    }
    
    render(){
        const {auth, profile} = this.props;
        if(!auth.uid) return <Redirect to='/login'/>  
        
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
    </section>
     
   ) ;
}
};
const mapStateToProps = (state) =>{
    console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'users'}
    ])
)(Profile);