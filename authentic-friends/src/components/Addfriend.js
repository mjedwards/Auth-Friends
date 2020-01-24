import React, { useContext, useState } from "react";
import { addFriends } from "../util/Api";
import { AuthContext } from "../context/AuthContext";

const Addfriend = () => {
  const { friendState, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({
    name: "",
    age: "",
    email: ""
  });

  const [msg, setMsg] = useState("");

  const onsubmit = e => {
    e.preventDefault();
    if (!(data.name && data.email)) {
      return setMsg("Fill in Name and Email");
    } else {
      addFriends(data, dispatch);
    }
  };

  const onchange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  return (
    <div>
      <form onSubmit={onsubmit}>
        <label>
          <h4>Name:</h4>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={data.name}
            onChange={onchange}
          />
        </label>
        <label>
          <h4>Email:</h4>
          <input
            type='text'
            name='email'
            placeholder='Email'
            value={data.email}
            onChange={onchange}
          />
        </label>
        <label>
          <h4>Age:</h4>
          <input
            type='text'
            name='age'
            placeholder='Age'
            value={data.age}
            onChange={onchange}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Addfriend;
