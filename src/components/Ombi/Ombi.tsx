import React, {useContext} from 'react'
import {UserContext} from '../Auth'
import {BackButton} from './BackButton'
import Iframe from 'react-iframe'
import './Ombi.sass'

export const Ombi:React.FC = ()=>{
    const user = useContext(UserContext)

    return(<>
    {user?
        <>
            <BackButton/>
            <Iframe
                url='https://gaming.minecraftsexy.website/ombi'
                className='fullscreen'
                allowFullScreen
            />
        </>
        :
        <>
            <p>Redirecting you to Ombi</p>
            {window.location.href = 'https://gaming.minecraftsexy.website/ombi'}
        </>
    }
    
    </>)
}