import React, {useContext} from 'react'
import {Redirect} from 'react-router'
import {UserContext} from '../Auth'

import './login.scss'
interface Props {
    signInWithGoogle: ()=>void
}

export const LoginPage: React.FC<Props> = (props)=>{
    const user = useContext(UserContext)
    // console.log(user)
    return(
        user ?
        <Redirect to='/'/>
        :
        <div className='text-center'>

            <div id="branding">
                <img className='logo' src="/minecraft.png" alt=""/>
                <h1>theserver</h1>
            </div>


            <div className="card bg-transparent fixed-bottom py-5">
                <div className='card header bg-transparent'>
                    <h5>Login</h5>
                </div>
                <div className='card-body bg-transparent'>
                    <button className='btn btn-lg'
                        onClick={()=>props.signInWithGoogle()}
                    >
                        <img className='rounded oauth-button' src="/logos/auth/google.png" alt="sign in with google"/>
                    </button>
                </div>
            </div>
        </div>
    )
}