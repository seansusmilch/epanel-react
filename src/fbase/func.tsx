import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/storage'
import {StatusProps, InviteUse, Invite} from 'components/Props'

// const fireConf = {
//     apiKey: process.env.REACT_APP_FIRE_API_KEY,
//     authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_FIRE_DB_URL,
//     projectId: process.env.REACT_APP_FIRE_PROJ_ID,
//     storageBucket: process.env.REACT_APP_FIRE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIRE_MSG_ID,
//     appId: process.env.REACT_APP_FIRE_APP_ID
// }
const fireConf = {
    apiKey: "AIzaSyDRd09q5us_3E3I74JQ86pll3oJFS3tSE8",
    authDomain: "minecraftsexy.website",
    databaseURL: "https://epanel-test.firebaseio.com",
    projectId: "epanel-test",
    storageBucket: "epanel-test.appspot.com",
    messagingSenderId: "593149639940",
    appId: "1:593149639940:web:aac246a82230c873aa6451",
    measurementId: "G-RF5PKWN84H"
}

firebase.initializeApp(fireConf)

export const auth = firebase.auth()
export const firestore =  firebase.firestore()
export const functions = firebase.functions()

const provider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
    console.log('Signing in with Google')
    auth.signInWithPopup(provider)
}

let conf_coll = firestore.collection('config')

export const getStatus = async()=>{
    console.log('Getting status')


    let statusdoc = await conf_coll.doc('status').get()
    let statusdata = statusdoc.data()

    // console.log(statusdata)
    return statusdata as StatusProps
}

export const setStatus = async(newStatus:StatusProps)=>{

    console.log('Submitting status:', newStatus)

    if(!newStatus.auto.enabled){
        newStatus.lastUpdated.auto = false
        newStatus.lastUpdated.time = Date.now()
    }

    conf_coll.doc('status').set(newStatus)
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

// export const puseInvite = functions.httpsCallable('addEmbyUser')
export const funcUseInvite = functions.httpsCallable('useInvite')

/**
 * Returns a promise for an array of Invites. Timestamps will be converted to Dates.
 */
export const getInvites = async()=>{
    console.log('Getting invites')

    let openInvites = await firestore.collection('invites').orderBy('created_at', 'desc').limit(10).get()
    let out:Invite[] = []

    let invitesPromise = new Promise<Invite[]>((resolve)=>{
        openInvites.forEach((doc)=>{
            let data = doc.data()
            data.created_at = (data.created_at as firebase.firestore.Timestamp).toDate()
            data.expires_at = (data.expires_at as firebase.firestore.Timestamp).toDate()

            out.push(data as Invite)
        })
        resolve(out)
    })
    return await invitesPromise
}

/**
 * 
 * @param id id of the document to be deleted. Usually just the code or the .id property of the doc data
 */
export const deleteInvite = async(id:string)=>{
    console.log('Deleting invite', id)

    let coll = firestore.collection('invites')
    await coll.doc(id).delete()
    return
}

/**
 * Adds an invite document in Firestore under the collection 'invites'.
 * 
 * The docuement will follow @interface Invite but with @type FirebaseFirestore.Timestamp
 * @param code string that will be the code
 * @param expires_after time in minutes
 * @param num_of_uses maximum number of uses for the code
 */
export const createInvite = async(code:string, expires_after:number, num_of_uses:number)=>{
    console.log('Creating invite')

    let coll = firestore.collection('invites')

    if((await coll.doc(code).get()).exists){
        return Error('An invite with that code already exists!')
    }

    const now = new Date()

    const created_at = firebase.firestore.Timestamp.fromDate(now)
    const expires_at = firebase.firestore.Timestamp.fromDate(new Date(now.valueOf() + expires_after * 1000 * 60))

    const newInvite:Invite = {
        code: code,
        id: code,
        uses_left: num_of_uses,
        created_at: created_at,
        expires_at: expires_at
    }

    await coll.doc(code).set(newInvite)

    newInvite.created_at = created_at.toDate()
    newInvite.expires_at = expires_at.toDate()

    return newInvite
}

export const getInviteUses = async()=>{
    console.log('Getting invite uses')

    let coll = await firestore.collection('invite_uses').orderBy('used_at', 'desc').limit(10).get()
    let out:InviteUse[] = []

    let invusePromise = new Promise<InviteUse[]>((resolve)=>{
        
        coll.forEach((doc)=>{
            let data = doc.data()
            data.used_at = (data.used_at as firebase.firestore.Timestamp).toDate()
            out.push(data as InviteUse)
        })
        resolve(out)
    })

    return await invusePromise
}

export const deleteInviteUse = async(id:string)=>{
    console.log('Deleting invite use', id)

    let coll = firestore.collection('invite_uses')
    await coll.doc(id).delete()
    return
}

export const getHomeDoc = async()=>{
    console.log('Getting home doc')

    let coll = firestore.collection('docs')

    let doc = (await coll.doc('home').get()).data()
    
    if(!doc)
        return

    // let md = (doc.md as string).replace(/\\n/g,'\n')
    let md = (doc.md as string).replace(/%\\n/g,'\n')
    // let md = (doc.md as string).replaceAll('\\n','\n')
    // sessionStorage.setItem('md',md)
    return md
}

export const saveHomeDoc = async(data:string | undefined)=>{
    if(typeof data === 'undefined')
        return
    console.log('Saving home doc')

    let coll = firestore.collection('docs')
    let doc = coll.doc('home')
    let oldData = (await doc.get()).data()

    let newData = {
        md: data.replaceAll('\n','%\\n'),
        previous: oldData ? oldData.md : ''
    }

    doc.set(newData)
}


const storageRef = firebase.storage().ref()

export const uploadImageFile = async(file:File, filename:string) => {
    const newImageRef = storageRef.child(`img/${filename}`)
    newImageRef.put(file)
}