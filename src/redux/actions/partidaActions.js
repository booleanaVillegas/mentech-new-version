export const newPartida = (partida) => {
    return (dispatch, getState,{getFirebase,getFirestore}) =>{
      //  const firebase = getFirebase();
        const firestore = getFirestore();

        
         firestore.collection('partidas').add({
               jugadores: partida.jugadores,
               fecha: new Date(),
               enCurso: true, 
               finalizada: false,
               equipo1: [" "],
               equipo2: [" "],
               ganador: ''
            
            })
        .then(()=>{
            dispatch({ type: 'PARTIDA_CREATED', partida})
        }).catch(err=>{
            dispatch({ type: 'PARTIDA_ERROR', err })
        })
    
    
}
}