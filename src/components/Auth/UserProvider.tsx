import React, {createContext, useEffect, useState} from 'react'
import {auth, getUser} from 'fbase'

// import * as base from ''
// console.log(base)
// const auth = base.auth
// const getUser = base.getUser

console.log(auth)
export const UserContext = createContext(auth.currentUser as any)

export interface User {
    uid: string
}

export let idToken = ''

export const UserProvider: React.FC = (props)=>{
    const [user, setUser] = useState<any>()
    const [loaded, setLoaded] = useState(false)

    // console.log('backend',backend)

    useEffect(() => {
        auth.onAuthStateChanged(async (usr:any)=>{

            if(!usr){
                console.log('No user')
                setUser(null)
                setLoaded(true)
                // localStorage.removeItem('user')
                return
            }

            const data = await getUser(usr.uid)

            // console.log(data)
            usr = {
                ...usr,
                ...data
            }

            // console.log('You must have logged out')
            setUser(usr)
            setLoaded(true)
            // localStorage.setItem('user', JSON.stringify(usr))
        })
    },[])

    return (<>
        {loaded?

            <UserContext.Provider value={user}>
                {props.children}
            </UserContext.Provider>
            :
            ''
        }
        
    </>)
}