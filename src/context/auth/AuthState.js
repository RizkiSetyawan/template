import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../setAuthToken";
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const URL = "http://localhost:8001";

  // LOAD USER
  const loadUser = async () => {
    // @todo - load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(`${URL}/api/user/auth`);
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // LOGIN USER
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post(`${URL}/api/user/auth`, formData, config);
      if (res.data.status === "error") {
        return dispatch({
          type: LOGIN_FAIL,
          payload: res.data
        });
      }
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.message
      });
    }
  };

  // LOGOUT
  const logout = () => dispatch({ type: LOGOUT})

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        error: state.error,
        login,
        logout,
        loadUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
