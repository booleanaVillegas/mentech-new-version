

const initState={
    authError: null
}

const authReducer =(state=initState, action)=>{
    switch(action.type){
        case 'LOGIN_ERROR':
        console.log('login failed');
        return{
            ...state,
            authError: action.err.message
        }
        case 'LOGIN_SUCCESS':
        console.log('login sucess');
        return {
            ...state,
            authError: null
        }
        case 'SIGNOUT_SUCCESS':
        console.log('signout success');
        return state;
        case 'SIGNUP_SUCCESS':
        console.log('signup sucess');
        return{
            ...state,
            authError: null
        }
        case 'SIGNUP_ERROR':
        console.log('sign up error');
        return{
            ...state,
            authError: action.err.message
        }
        default:
        return state
    }

}

export default authReducer;