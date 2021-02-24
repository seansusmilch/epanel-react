import React, {useContext} from 'react'
import {UserContext} from '../Auth'
import {BackButton} from './BackButton'
import Iframe from 'react-iframe'
import './Ombi.sass'
import { NewPageButton } from './NewPageButton'
import { isMobile } from 'react-device-detect'

export const Ombi:React.FC = ()=>{
    const user = useContext(UserContext)

    return(<>
    {user?
        <>
            <div className='Buttons m0'
                style={isMobile?
                    {
                        top:'0px',
                        right:'100px',
                        opacity:'1'
                    }
                    :
                    {left:0}}
            >
                <BackButton/>
                <NewPageButton/>
            </div>
            <Iframe
                url='https://gaming.minecraftsexy.website/ombi'
                className='fullscreen'
                allowFullScreen
            />
        </>
        :
        <>
            <p>Redirecting you to Ombi</p>

            {window.history.pushState({page: 1}, "theserver", "/")}
            {window.location.href = 'https://gaming.minecraftsexy.website/ombi'}
        </>
    }
    
    </>)
}