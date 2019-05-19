import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './controllers/Includes/Header'

import Groups from './controllers/Groups/Groups'
import DetailGrout from './controllers/Groups/DetailGroup'

import Teachers from './controllers/Teachers/Teachers'
import DetailTeacher from './controllers/Teachers/DetailTeacher'

function App() {
    window.DOMAIN_NAME = 'http://127.0.0.1:8000';
    window.VERSION_API = '/api/v1';
    window.API_URL = `${window.DOMAIN_NAME}${window.VERSION_API}`;
    return (
        <Router>
            <Header/> {/* Here all routers */}
            <div>
                <Route path="/groups/:id/" exact component={DetailGrout}/>
                <Route path="/groups/" exact component={Groups}/>

                <Route path="/teachers/:id/" exact component={DetailTeacher}/>
                <Route path="/teachers/" exact component={Teachers}/>

            </div>
        </Router>
    );
}

export default App;
