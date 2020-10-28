import React from 'react'
import './nav.css'
import { NavLink } from 'react-router-dom'

interface Props {
    isLoggedIn: boolean
    isAdmin: boolean
}

export const Navigation = (props:Props)=>{
    return(
        <div>

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                <a className="navbar-brand" href="/">
                    <img src="./minecraft.png" height={30} width={30} alt=""/>
                    theserver</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                        <NavLink to="/" className="nav-link" activeClassName='is-active'>Home</NavLink>
                        <NavLink to="/about" className="nav-link" activeClassName='is-active'>About</NavLink>
                        <NavLink to="/todo" className="nav-link" activeClassName='is-active'>ToDo</NavLink>
                    
                    <div className='navbar-nav ml-auto'>

                        {props.isLoggedIn ?
                        
                            <NavLink to="/logout" className="nav-link float-right">Logout</NavLink>
                            :
                            <div>
                                <NavLink to="/login" className="nav-link float-right" activeClassName='is-active'>Login</NavLink>
                                <NavLink to="/signup" className="nav-link float-right" activeClassName='is-active'>Sign Up</NavLink>
                            </div>
                        }
                    </div>
                    
                </div>
            </nav>
        </div>
    )
}