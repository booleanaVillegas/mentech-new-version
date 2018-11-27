const initState={

}

const challengeReducer =(state=initState, action)=>{
    switch(action.type){
        case 'POST_SUCCESS':
            console.log('New Post');
            return state;
        case 'POST_ERROR':
            console.log('Error creating post', action.err);
            return state;
        default:
            return state;    
    }
}

export default challengeReducer;