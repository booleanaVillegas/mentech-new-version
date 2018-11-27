import * as React from 'react';
import './Main.css';
import { Icon } from 'antd';
import { connect } from 'react-redux'
import { signOut } from '../../redux/actions/authActions'
import { Redirect } from 'react-router-dom'
import  {uploadPost} from '../../redux/actions/challegeActions'
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'
import IndividualPost from '../../components/IndividualPost/IndividualPost'

class Main extends React.Component {

    render() {
        const { auth,profile, posts } = this.props;
        

        let allPosts =  posts ? posts : '';

        console.log(allPosts);
        if (!auth.uid) return <Redirect to='/login' />
        return (
            <section className='main'>
                <h1 style={{ fontWeight: 'bold', marginTop: '12vh' }}> Reto de esta semana: </h1>
                <p>Siembra un arbol en tu comunidad</p>
                <div className="todos-posts">
                {allPosts && allPosts.map(function(item, i){
            
            return <IndividualPost
            key={i}
            nombre={allPosts[i].nombre}
            avatar={allPosts[i].avatar}
            picture={allPosts[i].picture}
            /> 
           // : if request.auth != null 
            })}   
                   
                </div>
                <div className="btn-upload">
                <Icon type="plus-circle" theme="filled" />
                <input className='file-input-btn' type="file" accept="image/*" onChange={
                    (e)=>{
                            this.props.upload(e.target.files[0],profile.nombre,profile.avatar);
                            }}/>
                </div>
                
            </section>

        );
    }
};
const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        posts: state.firestore.ordered.posts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
        upload: (picture, nombre, avatar) => dispatch(uploadPost(picture, nombre, avatar))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'posts', orderBy: ['fecha', 'desc'] },

    ])
)(Main);