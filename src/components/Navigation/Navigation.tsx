import React, {useContext} from 'react'
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
                    <img src="./minecraft64.webp" height={30} width={30} alt=""/>
                    theserver</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav" data-toggle={isMobile ? "collapse": ''} data-target="#navbarNav">

                
                    <div className='navbar-nav ml-3'>

                        <NavLink to="/" className={isMobile ? "nav-link d-flex flex-row-reverse mx-3" : "nav-link mx-3"} activeClassName='is-active' exact>Home</NavLink>
                        {user ? <NavLink to='/invite' className={isMobile ? "nav-link d-flex flex-row-reverse mx-3" : "nav-link mx-3"} activeClassName='is-active'>Invite</NavLink> : ''}
                            {user && user.isAdmin ?
                                <div>
                                    <NavLink to="/config" className={isMobile ? "nav-link d-flex flex-row-reverse mx-3" : "nav-link mx-3"} activeClassName='is-active'>Config</NavLink>
                                </div>
                                :
                                <></>
                            }
                        
                    </div>
                    
                    <div className='navbar-nav ml-auto'>

                        {user ?
                            <div className='d-flex justify-content-between'>
                                <img className="mx-2" 
                                    height={40} 
                                    width={40} 
                                    style={{
                                        borderRadius: '100px'
                                    }} 
                                    alt={user.displayName}
                                    src={user.photoURL ? user.photoURL:''}
                                />
                                <NavLink to="/logout" className="nav-link px-3">Logout</NavLink>
                            </div>
                            :
                            <div>
                                {/* <NavLink to="/logout" className="nav-link float-right">Logout</NavLink> */}
                                <NavLink to="/login" className="nav-link float-right px-3" activeClassName='is-active'>Login</NavLink>
                                {/* <NavLink to="/signup" className="nav-link float-right" activeClassName='is-active'>Sign Up</NavLink> */}
                            </div>
                        }
                    </div>
                    
                </div>
            </nav>
        </div>
    )
}