import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

var config = {
  apiKey: "AIzaSyCjs4O_dmEL0DXuQvBEcWP3I00-v4cJjmg",
  authDomain: "mentech-f7725.firebaseapp.com",
  databaseURL: "https://mentech-f7725.firebaseio.com",
  projectId: "mentech-f7725",
  storageBucket: "mentech-f7725.appspot.com",
  messagingSenderId: "818938297933"
  };
  firebase.initializeApp(config);
  const firestore = firebase.firestore();
  const settings = {/* your settings... */ timestampsInSnapshots: true};
  firestore.settings(settings);
  //const storage= firebase.storage().ref();
 console.log(firebase.storage());
  export default firebase;
 