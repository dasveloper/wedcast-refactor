import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyBSgrUWsADqxGFmRhmv_tieMpr4zDhGIn8",
    authDomain: "snaps-b05fb.firebaseapp.com",
    databaseURL: "https://snaps-b05fb.firebaseio.com",
    projectId: "snaps-b05fb",
    storageBucket: "snaps-b05fb.appspot.com",
    messagingSenderId: "408124275529"
  };
  const firebaseInit = firebase.initializeApp(config);
export default firebaseInit;