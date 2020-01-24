import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../util/Api";

const LoginForm = () => {
  const { dispatch } = useContext(AuthContext);

  const [message, setMessage] = useState("");

  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMessage("");

    if (!(data.password && data.username)) {
      setMessage("You must supply an email address and password!");
    } else {
      setMessage("");
      login(data, dispatch, setMessage);
    }
  };

  // if we successfully logged in, go to profile
  if (localStorage.getItem("MTN-token")) {
    return <Redirect to='profile' />;
  }
  return (
    <div>
      <p className='message'>{message}</p>
      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          <span>Username:</span>{" "}
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={data.username}
            onChange={handleChange}
          />
        </label>
        <label>
          {" "}
          <span>Password:</span>{" "}
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={data.password}
            onChange={handleChange}
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
