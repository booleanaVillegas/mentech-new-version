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
            if (i <= mitad) {
                equipoUno.push(shuffledPlayers[i])
            } else {
                equipoDos.push(shuffledPlayers[i])
            }
        }

        firestore.collection('partidas').add({
                jugadores: partida.jugadores,
                fecha: new Date(),
                enCurso: true,
                finalizada: false,
                equipo1: equipoUno,
                equipo2: equipoDos,
                ganador: ''

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

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}