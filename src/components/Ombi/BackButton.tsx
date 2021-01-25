import React from 'react'
import {NavLink} from 'react-router-dom'
import {ArrowUpRight} from 'react-bootstrap-icons'
import {isMobile} from 'react-device-detect'

export const BackButton:React.FC = ()=>{
    return(<>
        <NavLink to="/" className='backButton nav-link m3 bg-dark border-primary border-left rounded-right'
                style={isMobile?
                    {
                        top:'0px',
                        right:'100px'
                    }
                    :
                    {left:0}
                }
                >
            Home
            <ArrowUpRight/>
        </NavLink>
    </>)
}