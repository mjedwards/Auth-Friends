import React, { useReducer, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { AuthReducer, initialState } from "./reducers/AuthReducer";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import { getFriends } from "./util/Api";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/LogOut";
import Addfriend from "./components/Addfriend";
import Editfriend from "./components/Editfriend";
import Deletefriend from "./components/DeleteFriend";

function App() {
  const [friendState, dispatch] = useReducer(AuthReducer, initialState);
  const loggedIn = localStorage.getItem("MTN-token");

  useEffect(() => {
    getFriends(dispatch);
  }, [dispatch, loggedIn]);

  return (
    <AuthContext.Provider value={{ friendState, dispatch }}>
      <div className='App'>
        <h2>Hello! Login to see Your friends!</h2>
        <div className='appy'>
          <Link to='/'>
            <button className='blue'>Home</button>
          </Link>
          <Link to='/login'>
            <button className='green'>Log In</button>
          </Link>
        </div>
        <div className='content'>
          <Route path='/login' component={LoginForm} />
          {loggedIn && <Link to='/profile'>Profile</Link>}
          <ProtectedRoute path='/profile' component={Profile} />
          {loggedIn && <Link to='/logout'>Log Out</Link>}
          <ProtectedRoute path='/logout' component={Logout} />

          <ProtectedRoute path='/addfriends' component={Addfriend} />
          <ProtectedRoute path='/editfriends/:id' component={Editfriend} />
          <ProtectedRoute path='/deletefriends/:id' component={Deletefriend} />
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
