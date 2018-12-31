import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
    apiKey: "AIzaSyA6AZsIgRuort2IXDkhpAOVC_bI4i54XWs",
    authDomain: "chatapp-e83cd.firebaseapp.com",
    databaseURL: "https://chatapp-e83cd.firebaseio.com",
    projectId: "chatapp-e83cd",
    storageBucket: "chatapp-e83cd.appspot.com",
    messagingSenderId: "324745062436"
  };
  firebase.initializeApp(config);

  export default firebase;