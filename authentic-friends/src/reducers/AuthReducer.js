export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const RESET_API = "RESET_API";

export const LOAD_ING = "LOAD_ING";
export const LOAD_SUCCESS = "LOAD_SUCCESS";
export const LOAD_FAILURE = "LOAD_FAILURE";

export const ADD_SUCCESS = "ADD_SUCCESS";
export const EDIT_SUCCESS = "EDIT_SUCCESS";
export const DELETE_SUCCESS = "DELETE_SUCCESS";

export const initialState = {
  name: "",
  user_id: null,
  friendList: [],
  message: ""
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, apiAction: action.type };

    case LOGIN_FAILURE:
      return { ...state, apiAction: action.type };

    case LOAD_ING:
      return { ...state, message: "Loading...." };

    case LOAD_SUCCESS:
      console.log("success", {
        friendList: action.payload
      });
      return {
        ...state,
        friendList: action.payload,
        message: ""
      };

    case LOAD_FAILURE:
      return { ...state, apiAction: action.type };

    case ADD_SUCCESS:
      console.log(action.payload);
      return { ...state, friendList: [...state.friendList, action.payload] };

    case EDIT_SUCCESS:
      console.log(state.friendList);
      console.log(state.friendList);
      return {
        ...state,
        friendList: action.payload
      };

    case DELETE_SUCCESS:
      return { ...state, friendList: action.payload };

    default:
      return state;
  }
};
