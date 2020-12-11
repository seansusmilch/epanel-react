import * as dotenv from 'dotenv'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {signInWithGoogle, getStatus, setStatus, getUser} from './func'

dotenv.config()

const fireConf = {
    apiKey: process.env.REACT_APP_FIRE_API_KEY,
    authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIRE_DB_URL,
    projectId: process.env.REACT_APP_FIRE_PROJ_ID,
    storageBucket: process.env.REACT_APP_FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIRE_MSG_ID,
    appId: process.env.REACT_APP_FIRE_APP_ID
}

firebase.initializeApp(fireConf)

export const auth = firebase.auth()
export const firestore =  firebase.firestore()

export {signInWithGoogle, getStatus, setStatus, getUser}