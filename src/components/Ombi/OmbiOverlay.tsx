import React from 'react'
import { ArrowUpRight, XCircleFill } from 'react-bootstrap-icons'
// import {isMobile} from 'react-device-detect'
import { NavLink } from 'react-router-dom'
import {Fab, Action} from 'react-tiny-fab'
import 'react-tiny-fab/dist/styles.css'

export const OmbiOverlay:React.FC = ()=>{
    return (
        <Fab
            alwaysShowTitle={true}
            mainButtonStyles={{
                // backgroundColor: '#bb43f0'
                backgroundColor: '#660094',
            }}
            style={{
                left: '10px',
                bottom: '10px'
            }}
            // icon={<Wrench color='#fff' size='30px'/>}
            icon={<img src='./minecraft.webp' height={30} width={30} alt=""/>}

            >
            <Action text='Close Ombi' style={{backgroundColor:'#9614d0'}}>
                <NavLink to="/">
                        <XCircleFill color='#ddd' size='30px'/>
                </NavLink>
            </Action>
            
            <Action text='Open in New Tab' style={{backgroundColor:'#9614d0'}}>
                <a href="https://gaming.minecraftsexy.website/ombi" target='blank'>
                    <ArrowUpRight color='#ddd' size='30px'/>
                </a>
            </Action>
        </Fab>
    )
}