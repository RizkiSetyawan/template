import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import alertReducer from "./alertReducer";
import { ALERT_SUCCESS, ALERT_ERROR } from "../types";

const AlertState = props => {
  const initialState = {
    openAlert: false,
    typeAlert: "",
    messageAlert: ""
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const getAlertMessage = message => {
    if (
      message ===
      'duplicate key value violates unique constraint "bind_obu_dana_pkey"'
    ) {
      return "ID OBU sudah digunakan";
    } else if (
      message ===
      'duplicate key value violates unique constraint "bind_obu_dana_no_hp_key"'
    ) {
      return "No Handphone sudah digunakan";
    } else if (
      message ===
      'duplicate key value violates unique constraint "bind_obu_dana_plat_no_key"'
    ) {
      return "No Kendaraan sudah digunakan";
    } else {
      return "Data Berhasil di Binding";
    }
  };

  const handleOpenAlert = (type, msg) => {
    dispatch({
      type: ALERT_SUCCESS,
      payload: {
        typeAlert: type,
        messageAlert: getAlertMessage(msg)
      }
    });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: ALERT_ERROR
    });
  };

  return (
    <AlertContext.Provider
      value={{
        openAlert: state.openAlert,
        typeAlert: state.typeAlert,
        messageAlert: state.messageAlert,
        handleOpenAlert,
        handleCloseAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
