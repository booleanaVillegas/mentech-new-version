


export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase})=>{
        const firebase = getFirebase();
       // console.log(JSON.stringify(credentials))
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then( ()=>{
            dispatch({ type: 'LOGIN_SUCCESS'});
        }).catch((err)=>{
            dispatch({type: 'LOGIN_ERROR', err});
        });
    }
}

export const signOut = () =>{
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(()=>{
            dispatch({ type: 'SIGNOUT_SUCCESS'});   
        })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState,{getFirebase,getFirestore}) =>{
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp)=>{
            return firestore.collection('users').doc(resp.user.uid).set({
               nombre: newUser.nombre,
               email: newUser.email,
               nivel: "1",
               fecha: new Date(),
               avatar: 'https://firebasestorage.googleapis.com/v0/b/mentech-f7725.appspot.com/o/monster.svg?alt=media&token=e6027f63-35e6-40c3-bd8d-5113ef33d1d5'
            })
        }).then(()=>{
            dispatch({ type: 'SIGNUP_SUCCESS'});
        }).catch(err=>{
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
    
}
export const uploadProfilePicture =(picture, uid) => {
    return (dispatch, getState, {
        getFirebase,
        getFirestore
    }) => {
        const firebase = getFirebase();
        const firestore = getFirestore(); 

      console.log(uid);
       // console.log(firebasita);
    
        if(!!picture && isImage(picture.name)){
        firebase.storage().ref().child('profile/'+uid).put(picture).then((resp)=>{

            resp.ref.getDownloadURL().then((respuesta)=>{

                firestore.collection('users').doc(uid).update({
                    avatar: respuesta                
                 })
            })
         
        }).then(()=>{
            dispatch({ type: 'PROFILE_PIC_SUCCESS'});
        }).catch(err=>{
            dispatch({ type: 'PROFILE_PIC_ERROR', err })
        })
    }
}
}
function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}
function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
        //etc
        return true;
    default:
    return false;
    }    
}