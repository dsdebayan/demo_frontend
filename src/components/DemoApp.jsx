import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import withNavigation from './WithNavigation';
import withParams from './withParams'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import LogoutComponent from './LogoutComponent';
import ListTodosComponent from './ListTodosComponent';
import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent'
import TodoComponent from './TodoComponent';
import ErrorComponent from './ErrorComponent';

const DemoApp = (props) => {
    const LoginComponentWithNavigation = withNavigation(LoginComponent);
    const WelcomeComponentWithParams = withParams(WelcomeComponent);
    const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
    const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent);
    const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));

    return(
        <div className="DemoApp">
                <Router>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation />} />
                        <Route path="/login" element={<LoginComponentWithNavigation />} />
                        <Route path="/welcome/:name" element={
                            <AuthenticatedRoute>
                            <WelcomeComponentWithParams />
                            </AuthenticatedRoute>
                            } />
                        <Route path="/todos/:id" element={ 
                            <AuthenticatedRoute>
                                <TodoComponentWithParamsAndNavigation />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/todos" element={
                            <AuthenticatedRoute>
                            <ListTodosComponentWithNavigation />
                            </AuthenticatedRoute>
                            } />
                        <Route path="/logout" element={
                            <AuthenticatedRoute>
                            <LogoutComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterComponent/>
                </Router>
            </div>
    )
}

export default DemoApp