import React from 'react'
import "./App.sass"

import { BrowserRouter, Route, Switch} from 'react-router-dom'


import { Navigation } from 'components/Navigation/Navigation'
import { Home } from 'components/Home'
import { Config } from 'components/Config'
import { NotFoundError } from 'components/Error/Error'
import {InvitePage} from 'components/Invite'
import {LoginPage,UserProvider,LogoutPage} from 'components/Auth'
import { ToTop } from 'components/Common'
import { Ombi } from 'components/Ombi'

import {signInWithGoogle, getStatus, setStatus} from 'fbase'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


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
                        
                        <Route component={NotFoundError}/>
                    </Switch>
                </div>
                <ToTop/>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
