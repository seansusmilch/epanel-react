import React, {useState, useEffect} from 'react';
import "./App.css"

import { BrowserRouter, Route, Switch} from 'react-router-dom'

import { Navigation } from './components/Navigation'
import { Home } from './components/Home/Home'
import Config from './components/Config'
import { Error } from './components/Error'


import {signInWithGoogle, backend} from './base'
import {LoginPage,UserProvider,LogoutPage} from './components/Auth'

import axios from "axios"
import { StatusProps } from './components/Props';

const App: React.FC = () => {

    const getStatus = async () => {
        const res = await axios(`${backend}/config/status`)
        console.log('status : ', res.data)

        return res.data as StatusProps
    }

    const getConfig = async()=>{
        console.log('getConfig NOT IMPLEMENTED YET')
        return
    }

    return (
        <UserProvider>
            
            <BrowserRouter>
                <Navigation/>
                <div className="container" style={{ 
                    marginTop: '59px'
                }}>
                    <Switch>
                        <Route path="/" 
                            component={()=>
                                <Home getStatus={getStatus}/>
                            }
                            exact
                            />
                        <Route path="/config" 
                            component={()=>
                                <Config
                                    getStatus={getStatus}
                                    getConfig={getConfig}
                                />}
                            />
                            
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
