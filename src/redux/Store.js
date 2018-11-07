import rootReducer from './reducers/rootReducer';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore} from 'redux-firestore'
import { reactReduxFirebase, getFirebase} from 'react-redux-firebase'
import firebase from "../config/fbConfig.js";

export const store= createStore(rootReducer, 
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(firebase),
        reactReduxFirebase(firebase, {
            useFirestoreForProfile: true,
            attachAuthIsReady: true,
            userProfile: 'users'
        })    
));