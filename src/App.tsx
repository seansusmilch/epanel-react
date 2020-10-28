import React from 'react';
import "./App.css"

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Navigation } from './components/Navigation'
import { Home } from './components/Home/Home'
import { Error } from './components/Error'

function App() {
  return (
    <div>
        
        <BrowserRouter>
            <Navigation isLoggedIn={true} isAdmin={true}/>
            <div className="container" style={{ 
                marginTop: '59px'
            }}>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route component={Error}/>
                </Switch>
            </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
