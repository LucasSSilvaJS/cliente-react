import {initializeApp} from 'firebase/app'

import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCQfgyjiLZmlq9f7LXqX1fPs4xzRCtP4i0",
    authDomain: "tickets-ce9f0.firebaseapp.com",
    projectId: "tickets-ce9f0",
    storageBucket: "tickets-ce9f0.appspot.com",
    messagingSenderId: "7358372437",
    appId: "1:7358372437:web:5b26bb01e3f4021e20d2dc",
    measurementId: "G-60GEWTNSYS"
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export {auth, db, storage}