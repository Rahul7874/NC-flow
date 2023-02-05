import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import UserRegistration from './components/User/UserRegistration'
import Protected from './components/Protected'
import { Provider } from 'react-redux'
import store from './store'
import {
    BrowserRouter,
    Route,
    Routes
  } from "react-router-dom";
import Login from './components/User/Login'
import Profile from './components/User/Profile'
// import Observation from '../src/components/Pages/Observation'
// import  Ncrmain  from "../src/components/Pages/Ncrmain"


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}></Route>
                <Route path='app' element={<App/>}></Route>
                <Route path='userregistration' element={<Protected Component={UserRegistration }/>}></Route>
                <Route path='profile' element={<Protected Component={Profile }/>}></Route>
                {/* <Route path="observations" element={<Observation/>}></Route> */}
                {/* <Route path="/createncr" element={<Ncrmain/>}/> */}
            </Routes>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'))

