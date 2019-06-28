import 'firebase/auth';
import 'firebase/firestore';

import firebase from 'firebase/app';
import { authState } from 'rxfire/auth';
import { collectionData } from 'rxfire/firestore';
import { filter } from 'rxjs/operators';

const app = firebase.initializeApp();

const firestore = firebase.firestore(app); // Initialize firestore
const increment =  firebase.firestore.FieldValue.increment

export { app, firestore, increment };

export default firebase;