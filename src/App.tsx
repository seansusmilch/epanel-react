import React, {useState, useEffect} from 'react';
import "./App.sass"

import { BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'


import { Navigation } from './components/Navigation'
import { Home } from './components/Home/Home'
import Config from './components/Config'
import { NotFoundError } from './components/Error'
import {InvitePage} from './components/Invite'


import {signInWithGoogle, getStatus, setStatus} from './base'
import {LoginPage,UserProvider,LogoutPage} from './components/Auth'

import { StatusProps } from './components/Props';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { ToTop } from './components/Common/ToTop'
import { Ombi } from './components/Ombi';
import { RutorrentLogin } from './components/Rutorrent';

const App: React.FC = () => {

    return (
        <UserProvider>
            <ReactNotification />
            <BrowserRouter>
                <Navigation/>
                <div className="container-fluid" style={{ 
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
                                    setStatus={setStatus}
                                    // getConfig={getConfig}
                                />}
                            />
                        <Route path="/invite" component={InvitePage}/>
                            
                        <Route path='/logout' component={LogoutPage}/>
                        <Route path="/login" component={()=><LoginPage signInWithGoogle={signInWithGoogle}/>} />

                        <Route path="/ombi" render={()=><Ombi/>}/>
                        {/* <Route path="/ombi" render={()=>{window.location.href = 'https://gaming.minecraftsexy.website/ombi'
                            return(<p>Redirecting you to Ombi</p>)
                            }}/> */}
                        <Route path='/rutorrent' component={RutorrentLogin}/>
                        
                        <Route component={NotFoundError}/>
                    </Switch>
                </div>
                <ToTop/>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
