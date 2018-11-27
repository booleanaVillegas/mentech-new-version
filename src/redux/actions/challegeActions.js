export const uploadPost =(picture, nombre, avatar) => {
    return (dispatch, getState, {
        getFirebase,
        getFirestore
    }) => {
        const firebase = getFirebase();
        const firestore = getFirestore(); 
    
        if(!!picture && isImage(picture.name)){
        firebase.storage().ref().child('posts/'+new Date().getTime().toString()+"").put(picture).then((resp)=>{

            resp.ref.getDownloadURL().then((respuesta)=>{
console.log('Entré a la subida')
                firestore.collection('posts').add({
                    avatar: avatar,
                    nombre: nombre,
                    picture: respuesta,
                    likes: 0,
                    dislikes: 0,
                    fecha: new Date(),                 
                 })
            })
         
        }).then(()=>{
            dispatch({ type: 'POST_SUCCESS'});
        }).catch(err=>{
            dispatch({ type: 'POST_ERROR', err })
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