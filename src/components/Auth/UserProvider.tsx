import React, {createContext, useEffect, useState} from 'react'
import {auth, getUser} from '../../base'

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
            
            /** @todo
             * TODO:
             * Go to the backend and get user data
             * Add userdata to this usr object
             */

            // usr?.getIdToken(true).then((token:string)=>{
            //     // console.log('idToken ',token)
            //     let uid = usr?.uid
            //     axios({
            //         method: 'POST',
            //         url: `${backend}/user/${uid}`,
            //         data:{
            //             idToken: token
            //         }
            //     })
            //         .then((res)=>{
            //             // console.log('resdata',usr)
            //             usr = {
            //                 ...usr,
            //                 ...res.data.user
            //             }
            //             setUser(usr)
            //             idToken = token
            //             // console.log('Logged in?')
            //             return
            //         })
            //     // axios.post(`${backend}/user/${uid}`,{idToken: token})
            // })

            // console.log(usr.uid)

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

    // console.log('current user ', JSON.stringify(auth.currentUser))
    // if(!auth.currentUser){
    //     signInAnon()
    //     console.log(auth.currentUser)
    // }

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