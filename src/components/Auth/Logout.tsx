import React, {useEffect} from 'react'
import {auth} from '../../base'
import {Redirect} from 'react-router'

export const LogoutPage: React.FC = ()=>{

    useEffect(() => {
        console.log('Signing user out')
        auth.signOut()
    },[])
    

    return(
        <div>
            <h1>Successfully logged out</h1>
            <Redirect to='/'/>
        </div>
        
    )
}