import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/analytics";

var firebaseConfig = require('./firebaseConfig');
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = app.auth();

export {auth}
export default app



