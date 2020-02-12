import React, { useState, useEffect } from 'react';
import jwt from 'jwt-decode';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { isAuth, getCurrentUser } from './actions/authAction';
import { logout } from './actions/loginAction';
import { useDispatch, useSelector } from 'react-redux';
import { DASHBOARD } from './actions/types';
import Navbar from './components/navbar/Navbar';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import User from './components/users/User';
import Detail from './components/users/Detail';
import Dashboard from './components/dashboard/Dashboard';
import Feed from './components/feed/Feed';
import EditProfile from './components/users/EditProfile';
import CreateProfile from './components/users/CreateProfile';

import Comment from './components/comments/Comment';
import ExperienceForm from './components/experiences/ExperienceForm';
import EducationForm from './components/educations/EducationForm';
import FormProfile from './components/users/FormProfile';

const App = () => {
  // const currentUser = useSelector(state => state.authReducer.currentUser);
  const dispatch = useDispatch();
  const getUserLocalStorage = localStorage.getItem("token");
  try {
    if (getUserLocalStorage) {
      let token = jwt(getUserLocalStorage);
      if (token.exp < Date.now() / 1000) {
        dispatch(logout());
      } else {
        dispatch(getCurrentUser(token));
        dispatch(isAuth(true))
      }
    }
  } catch (err) {
    dispatch(logout());
  }


  return (
    <Router>
      <Navbar />
      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/feeds" component={Feed} />
        <Route path="/signup" component={Register} />
        <Route path="/login" component={Login} />

        <Route path="/profiles" exact component={User} />
        <Route path="/edit-profile" component={FormProfile} />
        <Route path="/create-profile" component={FormProfile} />

        {/* <Route path="/create-profile" component={CreateProfile} /> */}
        {/* <Route path="/edit-profile" component={EditProfile} /> */}

        <Route path="/profile/:handle" component={Detail} />
        <Route path="/post/:id" component={Comment} />
        <Route path="/add-experience" component={ExperienceForm} />
        <Route path="/add-education" component={EducationForm} />
        <Route path="*" render={() => "handleNotFound"} />

      </Switch>
      <Footer />
    </Router>
  )
}

export default App

