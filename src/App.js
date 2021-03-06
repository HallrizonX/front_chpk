import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './controllers/Includes/Header'

import Groups from './controllers/Groups/Groups'
import DetailGrout from './controllers/Groups/DetailGroup'

import Teachers from './controllers/Teachers/Teachers'
import DetailTeacher from './controllers/Teachers/DetailTeacher'

import Subjects from './controllers/Subjects/Subjects'
import DetailSubject from './controllers/Subjects/DetailSubject'

import News from './controllers/News/News'
import DetailNews from './controllers/News/DetailNews'

import Authorization from './controllers/Authorization/Authorization';

import Office from './controllers/Office/';

window.DOMAIN_NAME = 'http://192.168.1.104:8000'; // It can change
window.VERSION_API = '/api/v1'; // Version API
window.API_URL = `${window.DOMAIN_NAME}${window.VERSION_API}`;

function App() {

    if (localStorage.getItem('token')) {
        return (
            <Router>

                <Header/> {/* Here all routers which exists in project */}

                <Route path="/office/" exact component={Office}/>

                <Route path="/" exact component={News}/>
                <Route path="/news/:id/" exact component={DetailNews}/>

                <Route path="/groups/:id/" exact component={DetailGrout}/>
                <Route path="/groups/" exact component={Groups}/>

                <Route path="/teachers/:id/" exact component={DetailTeacher}/>
                <Route path="/teachers/" exact component={Teachers}/>

                <Route path="/subjects/:id/" exact component={DetailSubject}/>
                <Route path="/subjects/" exact component={Subjects}/>
            </Router>
        );
    } else {
        return (
            <>
                <Authorization/>
            </>
        )
    }
}

export default App;
