import React, {useState, useEffect} from 'react';
import "./App.css"

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Navigation } from './components/Navigation'
import { Home } from './components/Home/Home'
import Config from './components/Config'
import { Error } from './components/Error'
import {LoginPage,UserProvider,LogoutPage} from './components/Auth'

import {auth} from './base'
import {signInWithGoogle} from './base'

const App: React.FC = () => {

    return (
        <UserProvider>
            
            <BrowserRouter>
                <Navigation isLoggedIn={false} isAdmin={false}/>
                <div className="container" style={{ 
                    marginTop: '59px'
                }}>
                    <Switch>
                        <Route path="/" component={Home} exact/>
                        <Route path="/config" component={Config}/>
                        <Route path='/logout' component={LogoutPage}/>
                        <Route path="/login" component={()=><LoginPage signInWithGoogle={signInWithGoogle}/>} />
                        
                        <Route component={Error}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
