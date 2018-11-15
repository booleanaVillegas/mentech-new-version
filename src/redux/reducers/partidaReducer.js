let initState = {}

const partidaReducer = (state = initState, action)=>{
    switch(action.type){
        case 'PARTIDA_CREATED':
            console.log('created partida', action.partida);
            return state;
        case 'PARTIDA_ERROR':
            console.log('Error creating partida', action.err);
            return state;
        default:
            return state;    
    }
}

export default partidaReducer;