import React, {useContext} from 'react'
import {UserContext} from 'components/Auth'
import {BackButton} from './BackButton'
import Iframe from 'react-iframe'
import './Ombi.sass'
import { NewPageButton } from './NewPageButton'
import { isMobile } from 'react-device-detect'
import { OmbiOverlay } from './OmbiOverlay'

export const Ombi:React.FC = ()=>{
    const user = useContext(UserContext)

    return(<>
    {/* {user? */}
        <>
            <div className='Buttons m0'>
                {/* <BackButton/>
                <NewPageButton/> */}
                <OmbiOverlay/>
            </div>
            
            <Iframe
                url='https://gaming.minecraftsexy.website/ombi'
                className='fullscreen'
                allowFullScreen
            />
        </>
        {/* :
        <>
            <p>Redirecting you to Ombi</p>

            {window.history.pushState({page: 1}, "theserver", "/")}
            {window.location.href = 'https://gaming.minecraftsexy.website/ombi'}
        </>
    } */}
    
    </>)
}