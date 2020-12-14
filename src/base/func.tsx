import {auth,firestore} from './'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {StatusProps,NewStatus} from '../components/Props'

const provider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
    console.log('Signing in with Google')
    auth.signInWithPopup(provider)
}

export const getStatus = async()=>{
    let coll = firestore.collection('config')
    let statusdoc = await coll.doc('status').get()
    let statusdata = statusdoc.data()

    // console.log(statusdata)
    return statusdata as StatusProps
}

export const setStatus = async(newStatus:StatusProps)=>{

    console.log('Submitting status:', newStatus)
    let coll = firestore.collection('config')

    if(!newStatus.auto.enabled){
        newStatus.lastUpdated.auto = false
        newStatus.lastUpdated.time = Date.now()
    }

    coll.doc('status').set(newStatus)
}

export const getUser = async(uid:string)=>{
    let coll = firestore.collection('users')
    console.log('Getting data for uid:', uid)

    let userdoc = coll.doc(uid)
    let userdata = (await userdoc.get()).data()
    if(!userdata){
        userdata = {
            isAdmin: false
        }
        userdoc.set(userdata)
    }
    
    return userdata
}