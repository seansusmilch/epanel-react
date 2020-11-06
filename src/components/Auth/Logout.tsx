import React from 'react'
import {auth} from '../../base'
import {Redirect} from 'react-router'

export const LogoutPage: React.FC = ()=>{
    auth.signOut()

    return(
        // <div>
        //     <h1>Successfully logged out</h1>
            
        // </div>
        <Redirect to='/'/>
    )
}