import 'firebase/auth';
import 'firebase/firestore';

import firebase from 'firebase/app';

const app = firebase.initializeApp({}); //provide firebase creds

const firestore = firebase.firestore(app);
const increment =  firebase.firestore.FieldValue.increment;

export { app, firestore, increment };

export default firebase;