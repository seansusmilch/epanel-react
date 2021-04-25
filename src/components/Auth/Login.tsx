import React, {useContext} from 'react'
import {Redirect} from 'react-router'
import {UserContext} from 'components/Auth'
import Div100vh from 'react-div-100vh'

import './login.sass'
import { isMobile } from 'react-device-detect'
interface Props {
    signInWithGoogle: ()=>void
}

export const LoginPage: React.FC<Props> = (props)=>{
    const user = useContext(UserContext)
    // console.log(user)
    return(
        user ?
        <Redirect to='/'/>
        :<>
        <Div100vh className='text-center fullscreen-section'>
            <div className={'d-flex flex-column justify-content-around ' + (isMobile? 'mobile-cut' : 'h-100')}>

                <div id="brand">
                    <img className='logo' src="/minecraft.webp" alt=""/>
                    <h1>theserver</h1>
                </div>


                <div className="card bg-transparent">
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
        </Div100vh>
        </>
    )
}