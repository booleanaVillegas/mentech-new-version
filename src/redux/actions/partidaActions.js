export const newPartida = (partida) => {
    return (dispatch, getState, {
        getFirebase,
        getFirestore
    }) => {
        //  const firebase = getFirebase();
        const firestore = getFirestore();

        const mitad = Math.floor(partida.jugadores.length / 2);
        let equipoUno = [];
        let equipoDos = [];
        let shuffledPlayers = shuffle(partida.jugadores);

        for (let i = 0; i < partida.jugadores.length; i++) {
            if (i < mitad) {
                equipoUno.push(shuffledPlayers[i])
            } else {
                equipoDos.push(shuffledPlayers[i])
            }
        }

        firestore.collection('partidas').add({
                jugadores: partida.jugadores,
                fecha: new Date(),
                enCurso: true,
               
                equipo1: equipoUno,
                equipo2: equipoDos,
                ganador: '',
                puntos1: 0,
                puntos2: 0

            })
            .then(() => {
                dispatch({
                    type: 'PARTIDA_CREATED',
                    partida
                })
            }).catch(err => {
                dispatch({
                    type: 'PARTIDA_ERROR',
                    err
                })
            })


    }
}

export const setPuntos =(partida, equipo1, equipo2) => {
    return (dispatch, getState, {
        getFirebase,
        getFirestore
    }) => {
        const firestore = getFirestore();  
        firestore.collection('partidas').doc(partida.id).update({
            puntos1: parseInt(parseInt(partida.puntos1)+parseInt(equipo1)),
            puntos2: parseInt(parseInt(partida.puntos2)+parseInt(equipo2)),
         }).then(()=>{
            dispatch({ type: 'SET_PUNTOS_SUCCESS'});
        }).catch(err=>{
            dispatch({ type: 'SET_PUNTOS_ERROR', err })
        })
    }
}

export const finalizarPartida =(partida) => {
    return (dispatch, getState, {
        getFirebase,
        getFirestore
    }) => {
        const firestore = getFirestore();  
        firestore.collection('partidas').doc(partida.id).update({
            enCurso: false,
            
         }).then(()=>{
            dispatch({ type: 'FINALIZADA_SUCCESS'}, partida);
        }).catch(err=>{
            dispatch({ type: 'FINALIZADA_ERROR', err })
        })
    }
}


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}