export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase})=>{
        const firebase = getFirebase();
        console.log(JSON.stringify(credentials))
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
               apellido: newUser.apellido, 
               edad: newUser.edad,
               barrio: newUser.barrio,
               nivel: "0",
               avatar: 'https://firebasestorage.googleapis.com/v0/b/mentech-f7725.appspot.com/o/monster.svg?alt=media&token=e6027f63-35e6-40c3-bd8d-5113ef33d1d5'
            })
        }).then(()=>{
            dispatch({ type: 'SIGNUP_SUCCESS'});
        }).catch(err=>{
            dispatch({ type: 'SIGNUP_ERROR', err })
        })
    }
    
}