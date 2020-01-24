import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { LOGOUT } from "../reducers/AuthReducer";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const { dispatch } = useContext(AuthContext);
  const lo = "logged out";
  // remove the token and call dispatch to reset all global state
  localStorage.removeItem("MTN-token");
  dispatch(LOGOUT);

  return <Redirect to='/' />;
};

export default Logout;
