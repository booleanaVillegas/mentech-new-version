export const crateChallenge = (challenge) => {
return (dispatchEvent, getstate, {getFirebase, getFirestore}) =>{
// aqui hacemos coshas
dispatch({type:'CREATE_CHALLENGE', challenge})
}
};