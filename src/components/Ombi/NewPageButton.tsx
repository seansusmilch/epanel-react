import React from 'react'
import {NavLink} from 'react-router-dom'
import {ArrowUpRight} from 'react-bootstrap-icons'
import {isMobile} from 'react-device-detect'

export const NewPageButton:React.FC = ()=>{
    return(<>
        <a href="https://gaming.minecraftsexy.website/ombi" className='newPageButton nav-link m3 bg-dark border-primary border-left rounded-right'
                style={isMobile?
                    {
                        top:'0px',
                        right:'100px',
                        display: 'inline-block'
                    }
                    :
                    {
                        left:0,
                    }
                }
                target='blank'
                >
            Open in New Tab
            <ArrowUpRight/>
        </a>
    </>)
}