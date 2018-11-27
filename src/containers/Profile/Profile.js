import * as React from 'react'
import './Profile.css';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo.js'
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu.js'
import Logros from '../../components/Logros/Logros.js'
import Menu from '../../components/Menu/Menu'
import { uploadProfilePicture } from '../../redux/actions/authActions'
import {signOut} from '../../redux/actions/authActions'

class Profile extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            toggle:true
        }
        this.uploadPicture= this.uploadPicture.bind(this);
        this.slideMenu = this.slideMenu.bind(this);

        
    }
    slideMenu(){
        this.setState({toggle: !this.state.toggle})
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
    
        <div className="cont-img-name">
            <ProfileInfo
            image={profile.avatar}
            name= {profile.nombre}
            level={profile.nivel}
            editProfile={this.uploadPicture}
            />
        </div>
        <div className="cont-logros-menu">
            <ProfileMenu />        
            <Logros
            logros={logrosPersona}/>
        </div>
        <Menu
        toggle={this.state.toggle}
        slideMenu={this.slideMenu}
        user={profile}
        updatePic={(picture)=>{
           // console.log(this.props.firebase)
            this.props.updateProfilePic(picture,auth.uid)}}
        logout={this.props.signOut}
        />
    </section>
     
   ) ;
}
};
const mapStateToProps = (state) =>{
 //console.log(state);
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        logros: state.firestore.data.logros
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateProfilePic: (picture, uid) => dispatch(uploadProfilePicture(picture, uid)),
        signOut: ()=> dispatch(signOut())
    }
}


export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection: 'users'},
        {collection: 'logros'}
    ])
)(Profile);