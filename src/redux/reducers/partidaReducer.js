let initState = {}

const partidaReducer = (state = initState, action)=>{
    switch(action.type){
        case 'PARTIDA_CREATED':
            console.log('created partida', action.partida);
            return state;
        case 'PARTIDA_ERROR':
            console.log('Error creating partida', action.err);
            return state;
        case 'SET_PUNTOS_SUCCESS':
            console.log('puntos seteados');
            return state
        case 'SET_PUNTOS_ERROR':
            console.log('Error seteando los puntos', action.err);
            return state
        case 'FINALIZADA_SUCCESS':
            console.log('Partida Finalizada', action.partida);
        return state
        case 'FINALIZADA_ERROR':
            console.log('Error en la finalización', action.err);
        return state
        default:
            return state;    
    }
}

export default partidaReducer;