import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { deleteFriend } from "../util/Api";
import { AuthContext } from "../context/AuthContext";

const Deletefriend = props => {
  const { friendState, dispatch } = useContext(AuthContext);

  const id = Number.parseInt(props.match.params.id);
  const oldFriend = friendState.friendList.find(item => item.id === id);

  if (!oldFriend) {
    return <Redirect to='/profile' />;
  }

  const handleCancel = e => {
    e.preventDefault();

    props.history.push("/profile/");
  };

  const handleDelete = e => {
    e.preventDefault();

    deleteFriend(id, friendState, dispatch);

    props.history.push("/profile/");
  };

  return (
    <div>
      <h3>Confirm Deletion:</h3>
      <div className='top-nine-item'>
        <p>{oldFriend.name}</p>
        <p>Email: {oldFriend.email}</p>
        <p>Age: {oldFriend.age}</p>

        <div className='button-bar'>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Deletefriend;
