import {combineReducers} from 'redux'
import authReducer from './authReducer';
import challengeReducer from './challengeReducer'
import partidaReducer from './partidaReducer'
import {firestoreReducer} from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    challenge: challengeReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    partida: partidaReducer
})

export default rootReducer;