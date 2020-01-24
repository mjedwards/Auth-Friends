import axios from "axios";

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOAD_ING,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  ADD_SUCCESS,
  EDIT_SUCCESS,
  DELETE_SUCCESS
} from "../reducers/AuthReducer";

export const baseURL = "http://localhost:5000";

export const apiWithAuth = () => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("MTN-token")
    }
  });
};

export const login = (credentials, dispatch, setMessage) => {
  dispatch({ type: LOAD_ING });
  axios
    .post(`${baseURL}/api/login`, credentials)
    .then(res => {
      console.log("axios POST /api/login response:");
      console.log(res);

      localStorage.setItem("MTN-token", res.data.payload);
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch(err => {
      //   console.log("axios POST /api/login error:");
      //   const status = err.response.status;
      //   const statusText = err.response.statusText;
      //   const apiMessage = status.toString() + ": " + statusText;
      //   let message = apiMessage;
      //   if (status === 401) {
      //     message = "Invalid email/password pair";
      //   }
      //   setMessage(message);
      //   dispatch({ type: LOGIN_FAILURE, payload: apiMessage });
    });
};

//call to get friends data
export const getFriends = dispatch => {
  if (!localStorage.getItem("MTN-token")) return;

  dispatch({ type: LOAD_ING });

  apiWithAuth()
    .get("/api/friends")
    .then(res => {
      console.log("axios GET /api/friends response:");
      console.log(res.data);

      dispatch({ type: LOAD_SUCCESS, payload: res.data });
    })
    .catch(err => {
      //   console.log("axios GET /api/friends error:");
      //   console.log(err.response);
      //   const status = err.response.status;
      //   const statusText = err.response.statusText;
      //   const apiMessage = status.toString() + ": " + statusText;
      //   // if we have a 401 error, that means our token is expired or invalid
      //   if (status === 401) {
      //     localStorage.removeItem("MTN-token");
      //     dispatch({ type: LOGOUT });
      //   } else {
      //     dispatch({ type: LOAD_FAILURE, payload: apiMessage });
      //   }
    });
};

export const addFriends = (friend, dispatch) => {
  if (!localStorage.getItem("MTN-token")) return;

  apiWithAuth()
    .post("/api/friends", friend)
    .then(res => {
      console.log("axios POST /api/friends response:");
      console.log(res.data);
      dispatch({ type: ADD_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
    });
};

export const editFriends = (newFriend, id, friendState, dispatch) => {
  console.log(id);
  apiWithAuth()
    .put(`/api/friends/${id}`, newFriend)
    .then(res => {
      console.log(`/api/friends/${id} response:`);
      console.log(res);

      const updatedFriend = { ...newFriend, id: id };
      const updatedIndex = friendState.friendList.findIndex(
        item => item.id === id
      );
      const frontFriendList = friendState.friendList.slice(0, updatedIndex);
      const backFriendList = friendState.friendList.slice(updatedIndex + 1);
      const newFriendList = frontFriendList
        .concat([updatedFriend])
        .concat(backFriendList);

      dispatch({ type: EDIT_SUCCESS, payload: newFriendList });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteFriend = (id, friendState, dispatch) => {
  apiWithAuth()
    .delete(`/api/friends/${id}`)
    .then(res => {
      console.log(`axios DELETE /api/friends${id} response:`);
      console.log(res);

      // the response is just a success message; we need to adjust the state ourselves
      const newFriendList = friendState.friendList.filter(
        item => item.id !== id
      );

      dispatch({ type: DELETE_SUCCESS, payload: newFriendList });
    })
    .catch(err => {
      console.log(err);
    });
};
