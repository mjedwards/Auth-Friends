import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { friendState } = useContext(AuthContext);
  return (
    <div>
      <Link to={`/addfriends`}>
        <button>Add a friend</button>
      </Link>
      {friendState.message}
      {friendState.friendList.map(friend => {
        return (
          <div>
            <Friend key={Date.now()} people={friend} />
          </div>
        );
      })}
    </div>
  );
};

function Friend({ people, props }) {
  const { name, age, id, email } = people;

  return (
    <div>
      <h3>{name}</h3>
      <div>{age}</div>
      <div>{email}</div>
      <Link to={`/editfriends/${id}`}>
        <button>Edit</button>
      </Link>
      <Link to={`/deletefriends/${id}`}>
        <button>Delete</button>
      </Link>
    </div>
  );
}

export default Profile;
