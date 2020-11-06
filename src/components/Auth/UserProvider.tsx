import React, {createContext, useEffect, useState} from 'react'
import {auth} from '../../base'


export const UserContext = createContext(auth.currentUser)

export const UserProvider: React.FC = (props)=>{
    const [user, setUser] = useState<any>()

    useEffect(() => {
        auth.onAuthStateChanged((usr)=>{
            
            /** @todo
             * TODO:
             * Go to the backend and get user data
             * Add userdata to this usr object
             */
            usr?.getIdToken(true).then((idToken)=>{
                console.log('idToken ',idToken)
            })
            setUser(usr)
        })
    },[])

    // console.log('current user ', JSON.stringify(auth.currentUser))
    // if(!auth.currentUser){
    //     signInAnon()
    //     console.log(auth.currentUser)
    // }

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}