import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { editFriends } from "../util/Api";

const Editfriend = props => {
  const { friendState, dispatch } = useContext(AuthContext);
  const [msg, setMsg] = useState("");

  const id = Number.parseInt(props.match.params.id);
  console.log(id);
  const oldFriendState = friendState.friendList.find(item => item.id === id);
  const [data, setData] = useState({
    name: oldFriendState ? oldFriendState.name : "",
    age: oldFriendState ? oldFriendState.age : "",
    email: oldFriendState ? oldFriendState.email : ""
  });

  const onsubmit = e => {
    e.preventDefault();
    if (!(data.name && data.email)) {
      return setMsg("Fill in Name and Email");
    } else {
      console.log(data);
      editFriends(data, id, friendState, dispatch);
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

export default Editfriend;
