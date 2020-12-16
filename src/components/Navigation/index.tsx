import React, {useContext, useReducer} from 'react'
import './nav.css'
import { NavLink } from 'react-router-dom'
import {UserContext} from '../Auth'

import {isMobile} from 'react-device-detect'

// interface Props {
//     isLoggedIn: boolean
//     isAdmin: boolean
// }

export const Navigation: React.FC = ()=>{

    const user = useContext(UserContext)

    return(
        <div>

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                <a className="navbar-brand" href="/">
                    <img src="./minecraft64.png" height={30} width={30} alt=""/>
                    theserver</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav" data-toggle={isMobile ? "collapse": ''} data-target="#navbarNav">

                
                        <NavLink to="/" className="nav-link" activeClassName='is-active' exact>Home</NavLink>
                        {user && user.isAdmin ?
                            <div>
                                <NavLink to="/config" className="nav-link" activeClassName='is-active'>Config</NavLink>
                            </div>
                            :
                            ''
                        }
                    
                    <div className='navbar-nav ml-auto'>

                        {user ?
                            <div className='d-flex flex-row float-right'>
                                <img className="" 
                                    height={40} 
                                    width={40} 
                                    style={{
                                        borderRadius: '100px',
                                        marginRight: '10px'
                                    }} 
                                    src={user.photoURL ? user.photoURL:''}
                                />
                                <NavLink to="/logout" className="nav-link">Logout</NavLink>
                            </div>
                            :
                            <div>
                                {/* <NavLink to="/logout" className="nav-link float-right">Logout</NavLink> */}
                                <NavLink to="/login" className="nav-link float-right" activeClassName='is-active'>Login</NavLink>
                                {/* <NavLink to="/signup" className="nav-link float-right" activeClassName='is-active'>Sign Up</NavLink> */}
                            </div>
                        }
                    </div>
                    
                </div>
            </nav>
        </div>
    )
}