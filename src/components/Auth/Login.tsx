import React, {useContext} from 'react'
import {Redirect} from 'react-router'
import {UserContext} from '../Auth'

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
        <div>
            <button className='btn'
                onClick={()=>props.signInWithGoogle()}
            >
                <img src="https://raw.githubusercontent.com/react-native-community/react-native-google-signin/HEAD/img/signin-button.png" alt="sign in with google"/>
                {/* Sign In With Google */}
            </button>
        </div>
    )
}