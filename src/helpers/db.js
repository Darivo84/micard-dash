import firebase from 'firebase/app';
// import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAYEvhaA8ll0yZjNOmkSlMsWa3fj_68DSU',
  authDomain: 'micarddb.firebaseapp.com',
  projectId: 'micarddb',
  storageBucket: 'micarddb.appspot.com',
  messagingSenderId: '759298809503',
  appId: '1:759298809503:web:ba62dcbeaa2cea82df0caa',
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
