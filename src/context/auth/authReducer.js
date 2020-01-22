import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload.data.user
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        token: action.payload.data.token,
        error: null
      };

    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        error: action.payload
      };
    default:
      return state;
  }
};
