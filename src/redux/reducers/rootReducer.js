import {combineReducers} from 'redux'
import authReducer from './authReducer';
import challengeReducer from './challengeReducer'
import {firestoreReducer} from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    challenge: challengeReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;